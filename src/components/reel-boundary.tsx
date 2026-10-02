"use client"

import { Component, type ReactNode } from "react"
import { reel } from "@/lib/reel"

type Props = { children: ReactNode }

type State = { failed: boolean }

/** Keep the house up if the hero reel throws. Poster stays; resume remounts the video. */
export class ReelBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    /* swallowed — FAULT is worse than a still poster */
  }

  componentDidMount() {
    const retry = () => this.setState({ failed: false })
    window.addEventListener("pageshow", retry)
    document.addEventListener("visibilitychange", this.onVisible)
    this.cleanup = () => {
      window.removeEventListener("pageshow", retry)
      document.removeEventListener("visibilitychange", this.onVisible)
    }
  }

  componentWillUnmount() {
    this.cleanup?.()
  }

  private cleanup?: () => void

  private onVisible = () => {
    if (document.visibilityState === "visible" && this.state.failed) {
      this.setState({ failed: false })
    }
  }

  render() {
    if (this.state.failed) {
      return (
        <img
          src={reel.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )
    }
    return this.props.children
  }
}
