import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import "./WaveformPlayer.css"

/*
 * WaveformPlayer — dialog-v2.html's `.audio` block: the interactive
 * recording strip a dialog-review page is built around. A pseudo-noise
 * waveform (idle bars in `sand`, played bars in accent), translucent
 * moment BANDS over it (green/accent verdict wash, brightened when the
 * matching chronology card is hovered), a playhead, a hover probe with a
 * time bubble, and the control row (play/pause, elapsed time, caller's
 * actions on the right).
 *
 * Distinct from `Waveform` (icon-grade static bars next to a list row) the
 * way a chart is distinct from a sparkline — this one IS the page's
 * central instrument, with seek/highlight behavior the rest of the page
 * drives. That outside-in control comes through a ref handle
 * (`seek`/`highlightMark`) — every TimeTag and moment card on the page
 * targets THE player, exactly like the source's global `playerSeek()`.
 *
 * No real audio element yet (neither has the prototype) — playback is a
 * 100ms ticker; swap the ticker for a real <audio> later without changing
 * the page-facing API.
 */
export type WaveformPlayerMark = {
  id: string | number
  /** seconds */
  start: number
  end?: number
  tone: "green" | "accent"
}

export type WaveformPlayerHandle = {
  seek: (sec: number, opts?: { play?: boolean }) => void
  /** brighten a mark + show the probe at its start (null clears) */
  highlightMark: (id: string | number | null) => void
}

export type WaveformPlayerProps = {
  /** seconds */
  duration: number
  marks?: WaveformPlayerMark[]
  /** right side of the control row (transcript / speed / download / volume) */
  actions?: ReactNode
}

function fmt(sec: number): string {
  const s = Math.max(0, Math.round(sec))
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`
}

/* the source's own wave: deterministic pseudo-noise, low base amplitude
   with sparse peaks — same seed → same picture on every render */
function genWave(n: number): number[] {
  let seed = 987654321
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
  const out: number[] = []
  for (let i = 0; i < n; i++) {
    let v = 9 + rnd() * 14
    if (rnd() > 0.9) v = 27 + rnd() * 38
    if (rnd() > 0.98) v = 70 + rnd() * 22
    out.push(v)
  }
  return out
}

export const WaveformPlayer = forwardRef<WaveformPlayerHandle, WaveformPlayerProps>(
  function WaveformPlayer({ duration, marks = [], actions }, ref) {
    const waveRef = useRef<HTMLDivElement>(null)
    const [barCount, setBarCount] = useState(120)
    const [current, setCurrent] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [probe, setProbe] = useState<number | null>(null) // fraction 0..1
    const [litMark, setLitMark] = useState<string | number | null>(null)

    // bar step ~4px (2px bar + 2px gap), re-derived on resize
    useEffect(() => {
      const el = waveRef.current
      if (!el) return
      const measure = () => setBarCount(Math.max(48, Math.round(el.getBoundingClientRect().width / 4)))
      measure()
      const ro = new ResizeObserver(measure)
      ro.observe(el)
      return () => ro.disconnect()
    }, [])

    const bars = useMemo(() => genWave(barCount), [barCount])

    useEffect(() => {
      if (!playing) return
      const t = setInterval(() => {
        setCurrent((c) => {
          const next = c + 0.1
          if (next >= duration) {
            setPlaying(false)
            return duration
          }
          return next
        })
      }, 100)
      return () => clearInterval(t)
    }, [playing, duration])

    useImperativeHandle(ref, () => ({
      seek(sec, opts) {
        setCurrent(Math.max(0, Math.min(duration, sec)))
        if (opts?.play) setPlaying(true)
      },
      highlightMark(id) {
        setLitMark(id)
      },
    }))

    const frac = duration ? current / duration : 0
    const litStart = litMark != null ? marks.find((m) => m.id === litMark)?.start : undefined
    const probeFrac = probe ?? (litStart != null ? litStart / duration : null)

    const onWaveMouse = (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect()
      setProbe(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    }

    return (
      <div>
        <div
          ref={waveRef}
          className="artefact-wave"
          onMouseMove={onWaveMouse}
          onMouseLeave={() => setProbe(null)}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            const f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
            setCurrent(f * duration)
            setPlaying(true)
          }}
        >
          <div className="artefact-wave-bars" aria-hidden="true">
            {bars.map((h, i) => (
              <i
                key={i}
                className={i / bars.length <= frac ? "artefact-wave-bar--played" : undefined}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="artefact-wave-marks" aria-hidden="true">
            {marks.map((m) => {
              const s = Math.max(0, Math.min(1, m.start / duration))
              const e = Math.max(0, Math.min(1, (m.end ?? m.start + 1) / duration))
              return (
                <span
                  key={m.id}
                  className={`artefact-wave-mark artefact-wave-mark--${m.tone}${m.id === litMark ? " artefact-wave-mark--on" : ""}`}
                  style={{ left: `${s * 100}%`, width: `${Math.max(0.6, (e - s) * 100)}%` }}
                />
              )
            })}
          </div>
          <div className="artefact-wave-playhead" style={{ left: `${frac * 100}%` }} />
          {probeFrac != null && (
            <>
              <div className="artefact-wave-cursor" style={{ left: `${probeFrac * 100}%` }} />
              <div className="artefact-wave-tip" style={{ left: `${probeFrac * 100}%` }}>
                {fmt(probeFrac * duration)}
              </div>
            </>
          )}
        </div>

        <div className="artefact-wave-controls">
          <button
            type="button"
            className="artefact-wave-play artefact-focus-ring artefact-pressable"
            aria-label={playing ? "Пауза" : "Воспроизвести"}
            onClick={() => setPlaying((p) => !p)}
          >
            <Icon name={playing ? "pause" : "play"} size={26} weight="fill" />
          </button>
          <span
            style={{ fontVariantNumeric: "tabular-nums", fontSize: 14, color: color.mutedForeground }}
          >
            {fmt(current)} / {fmt(duration)}
          </span>
          {actions && <div className="artefact-wave-actions">{actions}</div>}
        </div>
      </div>
    )
  },
)
