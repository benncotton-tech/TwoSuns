"use client"

import {
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  type ReactNode,
} from "react"
import {
  assignLensToChannel,
  blankLens,
  channelOccupant,
  exportStoreJson,
  getLiveAirServerSnapshot,
  getLiveAirSnapshot,
  importStoreJson,
  lensLabel,
  markCalibrated,
  subscribeLiveAir,
  suggestChannelForLoad,
  writeStore,
} from "@/lib/live-air/store"
import {
  BUTTON_CHEATSHEET,
  buildActivateWizard,
  buildFullAfWizard,
  formatMetres,
  type WizardKind,
  type WizardStep,
} from "@/lib/live-air/motor-guide"
import {
  CHANNEL_META,
  FAR_FOCUS_RESCUE_CAL,
  MOTOR_CHANNELS,
  type AfSpeed,
  type LensProfile,
  type LiveAirStore,
  type MotorChannel,
  type MotorDirection,
} from "@/lib/live-air/types"

type Tab = "lenses" | "motor" | "calibrate" | "guide"

type LoadPlan = {
  lensId: string
  channel: MotorChannel
  kind: WizardKind
  reason: string
}

export function LiveAirApp() {
  const store = useSyncExternalStore(
    subscribeLiveAir,
    getLiveAirSnapshot,
    getLiveAirServerSnapshot
  )
  const [tab, setTab] = useState<Tab>("lenses")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [editorKey, setEditorKey] = useState(0)
  const [loadPlan, setLoadPlan] = useState<LoadPlan | null>(null)
  const [wizardSteps, setWizardSteps] = useState<WizardStep[] | null>(null)
  const [wizardIndex, setWizardIndex] = useState(0)
  const [wizardLensId, setWizardLensId] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  function persist(next: LiveAirStore) {
    writeStore(next)
  }

  const editing = useMemo(() => {
    if (creating) return blankLens()
    if (!editingId) return null
    return store.lenses.find((l) => l.id === editingId) ?? null
  }, [store, editingId, creating])

  function flash(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 3200)
  }

  function openEditor(mode: "create" | "edit", id?: string) {
    setCreating(mode === "create")
    setEditingId(mode === "edit" && id ? id : null)
    setEditorKey((n) => n + 1)
  }

  function beginLoad(lensId: string) {
    const lens = store.lenses.find((l) => l.id === lensId)
    if (!lens) return

    const suggestion = suggestChannelForLoad(store, lensId)

    // If already mapped to that channel, activation is enough after power cycle.
    const resolvedKind: WizardKind =
      lens.loadedOnChannel != null && lens.loadedOnChannel === suggestion.channel
        ? "activate"
        : "full-af"

    setLoadPlan({
      lensId,
      channel: suggestion.channel,
      kind: resolvedKind,
      reason: suggestion.reason,
    })
  }

  function confirmLoad(channel: MotorChannel, kind: WizardKind) {
    if (!loadPlan) return
    const { store: next, displacedId } = assignLensToChannel(
      store,
      loadPlan.lensId,
      channel
    )
    persist(next)

    const lens = next.lenses.find((l) => l.id === loadPlan.lensId)!
    const steps =
      kind === "activate"
        ? buildActivateWizard(channel)
        : buildFullAfWizard(channel, lens.calPoints, {
            hardStops: lens.hardStops,
            direction: lens.motorDirection,
            speed: lens.afSpeed,
            lidarScanDeg: lens.lidarScanDeg,
          })

    setWizardLensId(lens.id)
    setWizardSteps(steps)
    setWizardIndex(0)
    setLoadPlan(null)
    setTab("calibrate")

    if (displacedId) {
      const displaced = next.lenses.find((l) => l.id === displacedId)
      flash(
        displaced
          ? `Overwrote ${CHANNEL_META[channel].label}: ${lensLabel(displaced)} moved to library only.`
          : `Loaded onto ${CHANNEL_META[channel].label}.`
      )
    } else {
      flash(`Loaded onto ${CHANNEL_META[channel].label}.`)
    }
  }

  function finishWizard() {
    if (!wizardLensId) {
      setWizardSteps(null)
      return
    }
    persist(markCalibrated(store, wizardLensId))
    setWizardSteps(null)
    setWizardLensId(null)
    setWizardIndex(0)
    flash("Marked calibrated in the library.")
    setTab("motor")
  }

  function saveLens(draft: LensProfile) {
    const stamped = new Date().toISOString()
    const exists = store.lenses.some((l) => l.id === draft.id)
    const lenses = exists
      ? store.lenses.map((l) =>
          l.id === draft.id ? { ...draft, updatedAt: stamped } : l
        )
      : [...store.lenses, { ...draft, updatedAt: stamped }]

    // Keep slots coherent with loadedOnChannel
    const slots = { ...store.slots }
    for (const ch of MOTOR_CHANNELS) {
      if (slots[ch] === draft.id && draft.loadedOnChannel !== ch) {
        slots[ch] = null
      }
    }
    if (draft.loadedOnChannel) {
      slots[draft.loadedOnChannel] = draft.id
    }

    persist({ ...store, lenses, slots })
    setCreating(false)
    setEditingId(null)
    flash(exists ? "Lens updated." : "Lens added to library.")
  }

  function deleteLens(id: string) {
    if (!window.confirm("Remove this lens from the library?")) return
    const slots = { ...store.slots }
    for (const ch of MOTOR_CHANNELS) {
      if (slots[ch] === id) slots[ch] = null
    }
    persist({
      ...store,
      lenses: store.lenses.filter((l) => l.id !== id),
      slots,
    })
    setCreating(false)
    setEditingId(null)
    flash("Lens removed.")
  }

  function downloadLibrary() {
    const blob = new Blob([exportStoreJson(store)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `live-air-lenses-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function onImportFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const next = importStoreJson(String(reader.result))
        persist(next)
        flash(`Imported ${next.lenses.length} lenses.`)
      } catch {
        flash("Could not read that library file.")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="live-air-shell relative min-h-full flex-1">
      <div className="live-air-grid" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-lg flex-col px-4 pb-28 pt-6 sm:max-w-2xl sm:px-6">
        <header className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver/70">
            TwoSuns · on-set
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl leading-none tracking-tight text-cream sm:text-5xl">
            Live Air
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-silver">
            Unlimited lens library. The motor’s five colour channels are just a hot
            cache — load a profile, then follow the guided cal.
          </p>
        </header>

        {notice ? (
          <div
            role="status"
            className="mb-4 border border-gold/40 bg-gold/10 px-3 py-2 font-mono text-xs text-gold"
          >
            {notice}
          </div>
        ) : null}

        <MotorStrip store={store} onSelectChannel={(ch) => {
          persist({ ...store, activeChannel: ch })
          setTab("motor")
        }} />

        <nav
          className="mt-5 flex gap-1 border-b border-cream/10 pb-px"
          aria-label="Live Air sections"
        >
          {(
            [
              ["lenses", "Library"],
              ["motor", "Motor"],
              ["calibrate", "Calibrate"],
              ["guide", "Buttons"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => startTransition(() => setTab(id))}
              className={
                tab === id
                  ? "flex-1 border-b-2 border-gold px-2 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream"
                  : "flex-1 border-b-2 border-transparent px-2 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-silver/60 hover:text-cream"
              }
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-5">
          {tab === "lenses" ? (
            <LibraryPanel
              store={store}
              onAdd={() => openEditor("create")}
              onEdit={(id) => openEditor("edit", id)}
              onLoad={beginLoad}
              onExport={downloadLibrary}
              onImport={() => fileRef.current?.click()}
            />
          ) : null}

          {tab === "motor" ? <MotorPanel store={store} onLoad={beginLoad} /> : null}

          {tab === "calibrate" ? (
            wizardSteps ? (
              <WizardPanel
                steps={wizardSteps}
                index={wizardIndex}
                onBack={() => setWizardIndex((i) => Math.max(0, i - 1))}
                onNext={() => {
                  if (wizardIndex >= wizardSteps.length - 1) finishWizard()
                  else setWizardIndex((i) => i + 1)
                }}
                onCancel={() => {
                  setWizardSteps(null)
                  setWizardLensId(null)
                }}
                lensName={
                  wizardLensId
                    ? lensLabel(store.lenses.find((l) => l.id === wizardLensId)!)
                    : undefined
                }
              />
            ) : (
              <CalibrateIdle
                onRescue={() => {
                  setTab("lenses")
                  flash("Open a lens, edit far mark to 8 m, then Load for a full AF re-cal.")
                }}
              />
            )
          ) : null}

          {tab === "guide" ? <GuidePanel /> : null}
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onImportFile(file)
          e.target.value = ""
        }}
      />

      {editing ? (
        <LensEditor
          key={editorKey}
          initial={editing}
          isNew={creating}
          onClose={() => {
            setCreating(false)
            setEditingId(null)
          }}
          onSave={saveLens}
          onDelete={creating ? undefined : () => deleteLens(editing.id)}
        />
      ) : null}

      {loadPlan ? (
        <LoadSheet
          store={store}
          plan={loadPlan}
          onChannel={(ch) => setLoadPlan({ ...loadPlan, channel: ch })}
          onKind={(kind) => setLoadPlan({ ...loadPlan, kind })}
          onCancel={() => setLoadPlan(null)}
          onConfirm={() => confirmLoad(loadPlan.channel, loadPlan.kind)}
        />
      ) : null}
    </div>
  )
}

function MotorStrip({
  store,
  onSelectChannel,
}: {
  store: LiveAirStore
  onSelectChannel: (ch: MotorChannel) => void
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {MOTOR_CHANNELS.map((ch) => {
        const meta = CHANNEL_META[ch]
        const occupant = channelOccupant(store, ch)
        const active = store.activeChannel === ch
        return (
          <button
            key={ch}
            type="button"
            onClick={() => onSelectChannel(ch)}
            className={
              active
                ? "flex flex-col items-center gap-1.5 border border-cream/25 bg-cream/[0.06] px-1 py-2.5"
                : "flex flex-col items-center gap-1.5 border border-cream/10 bg-transparent px-1 py-2.5 hover:border-cream/20"
            }
            title={occupant ? lensLabel(occupant) : "Empty"}
          >
            <span
              className="h-3 w-3 rounded-full ring-2 ring-black/40"
              style={{ background: meta.swatch }}
              aria-hidden
            />
            <span className="font-mono text-[9px] uppercase tracking-wider text-silver/80">
              {meta.label.slice(0, 1)}
            </span>
            <span className="max-w-full truncate font-mono text-[9px] text-cream/70">
              {occupant ? shortName(occupant) : "—"}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function shortName(lens: LensProfile) {
  if (lens.focalLengthMm) return `${lens.focalLengthMm}`
  return lens.name.slice(0, 4) || "…"
}

function LibraryPanel({
  store,
  onAdd,
  onEdit,
  onLoad,
  onExport,
  onImport,
}: {
  store: LiveAirStore
  onAdd: () => void
  onEdit: (id: string) => void
  onLoad: (id: string) => void
  onExport: () => void
  onImport: () => void
}) {
  const sorted = [...store.lenses].sort((a, b) =>
    lensLabel(a).localeCompare(lensLabel(b))
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="live-air-btn live-air-btn-primary" onClick={onAdd}>
          Add lens
        </button>
        <button type="button" className="live-air-btn" onClick={onExport}>
          Export
        </button>
        <button type="button" className="live-air-btn" onClick={onImport}>
          Import
        </button>
      </div>

      <p className="font-mono text-[11px] text-silver/60">
        {store.lenses.length} in library · {occupiedCount(store)}/5 on motor
      </p>

      <ul className="space-y-2">
        {sorted.map((lens) => (
          <li
            key={lens.id}
            className="border border-cream/12 bg-black/30 px-3 py-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base text-cream">{lensLabel(lens)}</p>
                <p className="mt-0.5 font-mono text-[11px] text-silver/70">
                  {lens.tStop || "T—"}
                  {lens.serial ? ` · ${lens.serial}` : ""}
                  {" · "}
                  marks {formatMetres(lens.calPoints.nearM)} /{" "}
                  {formatMetres(lens.calPoints.midM)} /{" "}
                  {formatMetres(lens.calPoints.farM)}
                </p>
                {lens.loadedOnChannel ? (
                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gold">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: CHANNEL_META[lens.loadedOnChannel].swatch }}
                    />
                    On {CHANNEL_META[lens.loadedOnChannel].label}
                  </p>
                ) : (
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-silver/45">
                    Library only
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-1.5">
                <button
                  type="button"
                  className="live-air-btn live-air-btn-primary px-3 py-1.5 text-[10px]"
                  onClick={() => onLoad(lens.id)}
                >
                  Load
                </button>
                <button
                  type="button"
                  className="live-air-btn px-3 py-1.5 text-[10px]"
                  onClick={() => onEdit(lens.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function occupiedCount(store: LiveAirStore) {
  return MOTOR_CHANNELS.filter((ch) => store.slots[ch]).length
}

function MotorPanel({
  store,
  onLoad,
}: {
  store: LiveAirStore
  onLoad: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-silver">
        Hardware holds five AF maps. Everything else lives in this phone. Loading an
        archived lens overwrites one colour and runs a full LiDAR cal; loading a slot
        that’s already mapped only needs travel cal.
      </p>
      {MOTOR_CHANNELS.map((ch) => {
        const meta = CHANNEL_META[ch]
        const occupant = channelOccupant(store, ch)
        return (
          <div
            key={ch}
            className="flex items-center gap-3 border border-cream/12 bg-black/25 px-3 py-3"
          >
            <span
              className="h-8 w-8 shrink-0 rounded-full ring-2 ring-cream/15"
              style={{ background: meta.swatch }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-silver/60">
                {meta.label}
              </p>
              <p className="truncate text-cream">
                {occupant ? lensLabel(occupant) : "Empty slot"}
              </p>
              {occupant?.lastCalibratedAt ? (
                <p className="font-mono text-[10px] text-silver/50">
                  Cal {new Date(occupant.lastCalibratedAt).toLocaleDateString()}
                </p>
              ) : null}
            </div>
            {occupant ? (
              <button
                type="button"
                className="live-air-btn live-air-btn-primary px-3 py-1.5 text-[10px]"
                onClick={() => onLoad(occupant.id)}
              >
                Activate
              </button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

function CalibrateIdle({ onRescue }: { onRescue: () => void }) {
  return (
    <div className="space-y-4 border border-dashed border-cream/15 bg-black/20 px-4 py-8 text-center">
      <p className="font-[family-name:var(--font-heading)] text-2xl text-cream">
        No calibration running
      </p>
      <p className="mx-auto max-w-sm text-sm text-silver">
        Tap <span className="text-cream">Load</span> on a lens to start either a quick
        activate (travel cal) or a full three-mark LiDAR wizard with your saved
        distances.
      </p>
      <button type="button" className="live-air-btn" onClick={onRescue}>
        Far-focus soft? Use rescue marks
      </button>
      <p className="font-mono text-[10px] text-silver/50">
        Rescue defaults: {formatMetres(FAR_FOCUS_RESCUE_CAL.nearM)} /{" "}
        {formatMetres(FAR_FOCUS_RESCUE_CAL.midM)} /{" "}
        {formatMetres(FAR_FOCUS_RESCUE_CAL.farM)}
      </p>
    </div>
  )
}

function WizardPanel({
  steps,
  index,
  onBack,
  onNext,
  onCancel,
  lensName,
}: {
  steps: WizardStep[]
  index: number
  onBack: () => void
  onNext: () => void
  onCancel: () => void
  lensName?: string
}) {
  const step = steps[index]
  const last = index >= steps.length - 1

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
          Step {index + 1} / {steps.length}
          {lensName ? ` · ${lensName}` : ""}
        </p>
        <button type="button" className="font-mono text-[11px] text-silver/60" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div className="h-1 w-full bg-cream/10">
        <div
          className="h-full bg-gold transition-[width] duration-300"
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="border border-cream/12 bg-black/35 px-4 py-5">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight text-cream">
          {step.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-silver">{step.body}</p>
        {step.motorCue ? (
          <p className="mt-4 border-l-2 border-gold pl-3 font-mono text-xs text-gold">
            Motor: {step.motorCue}
          </p>
        ) : null}
        {step.tip ? (
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-silver/55">
            Tip: {step.tip}
          </p>
        ) : null}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="live-air-btn flex-1"
          onClick={onBack}
          disabled={index === 0}
        >
          Back
        </button>
        <button
          type="button"
          className="live-air-btn live-air-btn-primary flex-[2]"
          onClick={onNext}
        >
          {last ? "Done — save to library" : "Next"}
        </button>
      </div>
    </div>
  )
}

function GuidePanel() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-silver">
        The motor is still a one-button maze. This sheet mirrors PD Movie’s Live Air 4
        Smart taps so you don’t have to rewatch the setup video on set.
      </p>
      {BUTTON_CHEATSHEET.map((row) => (
        <div
          key={row.id}
          className="border border-cream/12 bg-black/25 px-3 py-3"
        >
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-cream">{row.action}</p>
            <p className="shrink-0 font-mono text-[11px] text-gold">{row.taps}</p>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-silver/70">{row.detail}</p>
        </div>
      ))}
      <p className="pt-2 font-mono text-[10px] leading-relaxed text-silver/45">
        Direct motor write over Bluetooth is not publicly documented for PD-BTMP-SPM.
        Until PD Movie opens RS485/BLE lens-map transfer, this app is the brain and the
        wizard drives the button sequence.
      </p>
    </div>
  )
}

function LoadSheet({
  store,
  plan,
  onChannel,
  onKind,
  onCancel,
  onConfirm,
}: {
  store: LiveAirStore
  plan: LoadPlan
  onChannel: (ch: MotorChannel) => void
  onKind: (kind: WizardKind) => void
  onCancel: () => void
  onConfirm: () => void
}) {
  const lens = store.lenses.find((l) => l.id === plan.lensId)
  if (!lens) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal
        aria-labelledby="load-title"
        className="w-full max-w-md border border-cream/20 bg-[#0a0a0a] p-4 shadow-2xl"
      >
        <h2 id="load-title" className="font-[family-name:var(--font-heading)] text-2xl text-cream">
          Load {lensLabel(lens)}
        </h2>
        <p className="mt-2 text-sm text-silver">{plan.reason}</p>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-silver/55">
          Motor channel
        </p>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {MOTOR_CHANNELS.map((ch) => {
            const occ = channelOccupant(store, ch)
            const selected = plan.channel === ch
            return (
              <button
                key={ch}
                type="button"
                onClick={() => onChannel(ch)}
                className={
                  selected
                    ? "border border-gold bg-gold/10 px-1 py-2"
                    : "border border-cream/15 px-1 py-2"
                }
              >
                <span
                  className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full"
                  style={{ background: CHANNEL_META[ch].swatch }}
                />
                <span className="block truncate font-mono text-[9px] text-cream/80">
                  {occ ? shortName(occ) : "—"}
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-silver/55">
          Wizard
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={
              plan.kind === "activate"
                ? "live-air-btn live-air-btn-primary"
                : "live-air-btn"
            }
            onClick={() => onKind("activate")}
          >
            Activate
            <span className="mt-1 block font-mono text-[9px] font-normal opacity-70">
              Travel cal only
            </span>
          </button>
          <button
            type="button"
            className={
              plan.kind === "full-af"
                ? "live-air-btn live-air-btn-primary"
                : "live-air-btn"
            }
            onClick={() => onKind("full-af")}
          >
            Full AF cal
            <span className="mt-1 block font-mono text-[9px] font-normal opacity-70">
              3 LiDAR marks
            </span>
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          <button type="button" className="live-air-btn flex-1" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="live-air-btn live-air-btn-primary flex-[2]"
            onClick={onConfirm}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

function LensEditor({
  initial,
  isNew,
  onClose,
  onSave,
  onDelete,
}: {
  initial: LensProfile
  isNew: boolean
  onClose: () => void
  onSave: (lens: LensProfile) => void
  onDelete?: () => void
}) {
  const [draft, setDraft] = useState(initial)

  function set<K extends keyof LensProfile>(key: K, value: LensProfile[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal
        className="flex max-h-[92vh] w-full max-w-md flex-col border border-cream/20 bg-[#0a0a0a]"
      >
        <div className="flex items-center justify-between border-b border-cream/10 px-4 py-3">
          <h2 className="font-[family-name:var(--font-heading)] text-xl text-cream">
            {isNew ? "New lens" : "Edit lens"}
          </h2>
          <button type="button" className="font-mono text-xs text-silver" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto px-4 py-4">
          <Field label="Brand">
            <input
              className="live-air-input"
              value={draft.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="Cooke S4/i"
            />
          </Field>
          <Field label="Name / focal">
            <input
              className="live-air-input"
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="32mm"
            />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Focal (mm)">
              <input
                className="live-air-input"
                type="number"
                inputMode="decimal"
                value={draft.focalLengthMm ?? ""}
                onChange={(e) =>
                  set(
                    "focalLengthMm",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              />
            </Field>
            <Field label="T-stop">
              <input
                className="live-air-input"
                value={draft.tStop}
                onChange={(e) => set("tStop", e.target.value)}
                placeholder="T2.0"
              />
            </Field>
          </div>
          <Field label="Serial">
            <input
              className="live-air-input"
              value={draft.serial}
              onChange={(e) => set("serial", e.target.value)}
            />
          </Field>

          <p className="pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            LiDAR AF marks (metres)
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(["nearM", "midM", "farM"] as const).map((key) => (
              <Field key={key} label={key.replace("M", "")}>
                <input
                  className="live-air-input"
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  value={draft.calPoints[key]}
                  onChange={(e) =>
                    set("calPoints", {
                      ...draft.calPoints,
                      [key]: Number(e.target.value),
                    })
                  }
                />
              </Field>
            ))}
          </div>
          <button
            type="button"
            className="live-air-btn w-full text-[10px]"
            onClick={() => set("calPoints", { ...FAR_FOCUS_RESCUE_CAL })}
          >
            Apply far-focus rescue marks
          </button>

          <div className="grid grid-cols-2 gap-2">
            <Field label="Direction">
              <select
                className="live-air-input"
                value={draft.motorDirection}
                onChange={(e) =>
                  set("motorDirection", e.target.value as MotorDirection)
                }
              >
                <option value="normal">Normal</option>
                <option value="reversed">Reversed</option>
              </select>
            </Field>
            <Field label="AF speed">
              <select
                className="live-air-input"
                value={draft.afSpeed}
                onChange={(e) => set("afSpeed", e.target.value as AfSpeed)}
              >
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
              </select>
            </Field>
          </div>

          <Field label="LiDAR scan">
            <select
              className="live-air-input"
              value={draft.lidarScanDeg}
              onChange={(e) =>
                set("lidarScanDeg", Number(e.target.value) as 4 | 16)
              }
            >
              <option value={4}>4°</option>
              <option value={16}>16°</option>
            </select>
          </Field>

          <label className="flex items-center gap-2 font-mono text-xs text-silver">
            <input
              type="checkbox"
              checked={draft.hardStops}
              onChange={(e) => set("hardStops", e.target.checked)}
            />
            Hard stops (cinema / limited stills)
          </label>

          <Field label="Notes">
            <textarea
              className="live-air-input min-h-20"
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Matte box clearance, preferred mount side…"
            />
          </Field>
        </div>

        <div className="flex gap-2 border-t border-cream/10 p-4">
          {onDelete ? (
            <button type="button" className="live-air-btn text-destructive" onClick={onDelete}>
              Delete
            </button>
          ) : null}
          <button type="button" className="live-air-btn flex-1" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="live-air-btn live-air-btn-primary flex-[2]"
            onClick={() => onSave(draft)}
            disabled={!draft.name.trim() && !draft.brand.trim() && !draft.focalLengthMm}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-silver/55">
        {label}
      </span>
      {children}
    </label>
  )
}
