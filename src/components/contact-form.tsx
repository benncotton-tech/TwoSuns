"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { inquiryLanes } from "@/lib/site"
import { cn } from "@/lib/utils"

type Status = "idle" | "submitting" | "success" | "error"

type FieldErrors = {
  name?: string
  email?: string
  inquiry?: string
  message?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [inquiry, setInquiry] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverMessage, setServerMessage] = useState("")

  useEffect(() => {
    const lane = new URLSearchParams(window.location.search).get("inquiry")
    if (lane && inquiryLanes.some((item) => item.value === lane)) {
      setInquiry(lane)
    }
  }, [])

  function validate() {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = "Tell us who is writing."
    if (!email.trim()) next.email = "We need an email so we can write back."
    else if (!emailPattern.test(email.trim())) next.email = "That email does not look usable."
    if (!inquiry) next.inquiry = "Choose a lane so we know how to read it."
    if (!message.trim()) next.message = "The letter is empty."
    else if (message.trim().length < 20)
      next.message = "Give us a little more — twenty characters at least."
    return next
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()
    const nextErrors = validate()
    setErrors(nextErrors)
    setServerMessage("")
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle")
      return
    }

    setStatus("submitting")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          inquiry,
          message: message.trim(),
        }),
      })
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null
      if (!response.ok) {
        setStatus("error")
        setServerMessage(data?.error ?? "We could not take this letter.")
        return
      }
      setStatus("success")
      setName("")
      setEmail("")
      setCompany("")
      setInquiry("")
      setMessage("")
      setErrors({})
    } catch {
      setStatus("error")
      setServerMessage("The line dropped. Try again in a moment.")
    }
  }

  if (status === "success") {
    return (
      <div
        className="border border-gold/40 bg-gold/5 px-6 py-10"
        role="status"
        aria-live="polite"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
          Received
        </p>
        <h2 className="mt-3 font-heading text-3xl text-cream">We have the letter.</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-silver">
          Billy or Benjamin will write back. If it is urgent, use
          hello@twosuns.se.
        </p>
        <button
          type="button"
          className="mt-8 inline-flex h-11 items-center border border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    )
  }

  const hasFieldErrors = Object.keys(errors).length > 0

  return (
    <form method="post" action="/#contact" onSubmit={onSubmit} className="space-y-6" noValidate>
      {status === "error" ? (
        <div
          className="border border-destructive bg-destructive/15 px-4 py-3 text-sm text-cream"
          role="alert"
        >
          {serverMessage || "Something went wrong on the way in."}
        </div>
      ) : null}

      {hasFieldErrors ? (
        <div
          className="border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-cream"
          role="alert"
        >
          The letter is incomplete. Check the notes under the fields.
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-11 rounded-none border-cream/20 bg-transparent text-cream"
            placeholder="Your name"
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="h-11 rounded-none border-cream/20 bg-transparent text-cream"
            placeholder="you@studio.com"
          />
        </Field>
      </div>

      <Field id="company" label="Company or project" hint="Optional">
        <Input
          id="company"
          name="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="h-11 rounded-none border-cream/20 bg-transparent text-cream"
          placeholder="If it already has a name"
        />
      </Field>

      <Field id="inquiry" label="Lane" error={errors.inquiry}>
        <select
          id="inquiry"
          name="inquiry"
          value={inquiry}
          onChange={(event) => {
            setInquiry(event.target.value)
            setErrors((current) => ({ ...current, inquiry: undefined }))
          }}
          aria-invalid={Boolean(errors.inquiry)}
          aria-describedby={errors.inquiry ? "inquiry-error" : undefined}
          className={cn(
            "h-11 w-full rounded-none border border-cream/20 bg-ink px-2.5 text-sm text-cream outline-none",
            "focus-visible:border-gold focus-visible:ring-3 focus-visible:ring-gold/40"
          )}
        >
          <option value="">What is this about?</option>
          {inquiryLanes.map((lane) => (
            <option key={lane.value} value={lane.value}>
              {lane.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Letter" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-36 rounded-none border-cream/20 bg-transparent text-cream"
          placeholder="What are you making, and why us?"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-silver">
          No mailing list. A person reads this.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center bg-gold px-8 text-[0.7rem] uppercase tracking-[0.28em] text-ink hover:bg-gold/85 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send the letter"}
        </button>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label
          htmlFor={id}
          className="text-[0.7rem] uppercase tracking-[0.22em] text-silver"
        >
          {label}
        </Label>
        {hint ? (
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-silver/60">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-gold">
          {error}
        </p>
      ) : null}
    </div>
  )
}
