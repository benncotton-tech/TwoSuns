"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inquiryLanes } from "@/lib/site"

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

  function validate() {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = "Tell us who is writing."
    if (!email.trim()) next.email = "We need an email so we can write back."
    else if (!emailPattern.test(email.trim())) next.email = "That email does not look usable."
    if (!inquiry) next.inquiry = "Choose a lane so the right desk opens it."
    if (!message.trim()) next.message = "The letter is empty."
    else if (message.trim().length < 20)
      next.message = "Give us a little more — twenty characters at least."
    return next
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
        setServerMessage(data?.error ?? "The desk could not take this letter.")
        return
      }
      setStatus("success")
      setName("")
      setEmail("")
      setCompany("")
      setInquiry("")
      setMessage("")
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
          Someone at the desk that should read it will write back. If it is
          urgent, use hello@twosuns.se and put the city in the subject.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-8 h-11 rounded-none border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {status === "error" ? (
        <div
          className="border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {serverMessage || "Something went wrong on the way in."}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={errors.name}
        >
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

      <div className="space-y-2">
        <Label htmlFor="inquiry" className="text-[0.7rem] uppercase tracking-[0.22em] text-silver">
          Lane
        </Label>
        <Select
          value={inquiry || null}
          onValueChange={(value) => {
            setInquiry(value ?? "")
            setErrors((current) => ({ ...current, inquiry: undefined }))
          }}
        >
          <SelectTrigger
            id="inquiry"
            className="h-11 w-full rounded-none border-cream/20 bg-transparent text-cream"
            aria-invalid={Boolean(errors.inquiry)}
          >
            <SelectValue placeholder="What is this about?" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-cream/15 bg-ink text-cream">
            {inquiryLanes.map((lane) => (
              <SelectItem
                key={lane.value}
                value={lane.value}
                className="rounded-none focus:bg-gold/15 focus:text-cream"
              >
                {lane.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.inquiry ? (
          <p id="inquiry-error" className="text-xs text-destructive">
            {errors.inquiry}
          </p>
        ) : null}
      </div>

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
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 rounded-none bg-gold px-8 text-[0.7rem] uppercase tracking-[0.28em] text-ink hover:bg-gold/85"
        >
          {status === "submitting" ? "Sending…" : "Send to the desk"}
        </Button>
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
        {hint ? <span className="text-[0.65rem] uppercase tracking-[0.18em] text-silver/60">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
