import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from "react"
import { Icon } from "@/primitives/Icon"
import { Chip } from "@/components/composed/Chip"
import { MessageBubble } from "@/components/composed/MessageBubble"
import { TypingIndicator } from "@/components/composed/TypingIndicator"
import "./AssistantDock.css"

/*
 * AssistantDock — a SECTION, and deliberately one of the few bespoke
 * "organisms" in the system (same category as SidebarNav). Real state
 * machine (idle pill → open panel → collapsed "orb" after scrolling away
 * and closing), not a static snapshot.
 *
 * Built from: Surface (glow/panel backdrops), Icon (spark/send/close),
 * Chip (suggestion pills), MessageBubble (chat), TypingIndicator (the
 * "thinking" delay) — everything else (gradient button, glass field with a
 * gradient border, the spinning blob icon, ambient glow) is real CSS in
 * AssistantDock.css, not expressible as Foundation-level generic primitives
 * without inventing fiction.
 *
 * `intro`/`fallbackAnswer`/`chips` have no client-specific defaults —
 * pass real copy per product, don't rely on the placeholders below.
 *
 * The rest of the page can SUMMON the dock with a prepared question via
 * the ref handle (`ask`) — dialog-v2.html does this from at least three
 * places (the "Назначить профиль" pill, every SparkLink insight, the
 * upsell cards' "Потренировать с ассистентом"), all funneling into the
 * source's global `ask()`. Found missing while rebuilding that page.
 */

export type ChipQuestion = { question: string; answer: ReactNode }

export type AssistantDockHandle = {
  /** open the dock, post `question` as the user, answer after the typing
   *  delay (falls back to `fallbackAnswer` when no answer given) */
  ask: (question: string, answer?: ReactNode) => void
}

export type AssistantDockProps = {
  title?: string
  intro?: string
  chips?: ChipQuestion[]
  fallbackAnswer?: ReactNode
  placeholder?: string
}

type Mode = "idle" | "open" | "orb"
type Msg = { id: number; from: "user" | "bot"; content: ReactNode }

let msgId = 0

export const AssistantDock = forwardRef<AssistantDockHandle, AssistantDockProps>(function AssistantDock({
  title = "Ассистент",
  intro = "Спросите что угодно или начните с подсказки:",
  chips = [],
  fallbackAnswer = "Уточните вопрос — разберём подробнее.",
  placeholder = "Задайте вопрос…",
}: AssistantDockProps, ref) {
  const [mode, setMode] = useState<Mode>("idle")
  const [messages, setMessages] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [value, setValue] = useState("")
  const fieldRef = useRef<HTMLInputElement>(null)
  const msgsRef = useRef<HTMLDivElement>(null)

  // closeAsk(): if the page has scrolled away from the top, collapse to the
  // floating "orb" instead of the idle pill — verbatim source behavior.
  const close = () => {
    setMode(window.scrollY > 120 ? "orb" : "idle")
    fieldRef.current?.blur()
    document.body.style.overflow = ""
  }

  const open = () => {
    setMode("open")
    document.body.style.overflow = "hidden"
    requestAnimationFrame(() => fieldRef.current?.focus())
  }

  useEffect(() => {
    if (mode !== "open") return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  useEffect(() => {
    msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight })
  }, [messages, typing])

  useImperativeHandle(ref, () => ({ ask: (q, a) => ask(q, a ?? null) }))

  const ask = (question: string, answer: ReactNode) => {
    setMode("open")
    document.body.style.overflow = "hidden"
    setMessages((m) => [...m, { id: ++msgId, from: "user", content: question }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { id: ++msgId, from: "bot", content: answer ?? fallbackAnswer }])
    }, 650)
  }

  const send = () => {
    const v = value.trim()
    if (!v) { fieldRef.current?.focus(); return }
    ask(v, null)
    setValue("")
    fieldRef.current?.focus()
  }

  const handleBtnClick = () => { if (mode === "open") send(); else open() }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send()
    else if (e.key === "Escape") { setValue(""); close() }
  }

  return (
    <div className={`assistant-dock assistant-dock--${mode === "open" ? "open" : mode === "orb" ? "orb" : "idle"}`}>
      <div className="assistant-dock-panel">
        <div className="assistant-dock-glow" aria-hidden="true">
          <span className="blob blob1" /><span className="blob blob2" /><span className="blob blob3" />
        </div>
        <div className="assistant-dock-inner">
          <div className="assistant-dock-head">
            <span className="assistant-dock-title">{title}</span>
            <button
              type="button"
              className="assistant-dock-close"
              aria-label="Закрыть"
              onMouseDown={(e) => e.preventDefault()}
              onClick={close}
            >
              <Icon name="close" size={16} />
            </button>
          </div>
          <div className="assistant-dock-msgs" ref={msgsRef}>
            {messages.length === 0 && (
              <>
                <div className="assistant-dock-sub">{intro}</div>
                <div className="assistant-dock-chips">
                  {chips.map((c) => (
                    <Chip
                      key={c.question}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { ask(c.question, c.answer); fieldRef.current?.focus() }}
                    >
                      {c.question}
                    </Chip>
                  ))}
                </div>
              </>
            )}
            {messages.map((m) => <MessageBubble key={m.id} from={m.from}>{m.content}</MessageBubble>)}
            {typing && <TypingIndicator />}
          </div>
        </div>
      </div>

      <div className="assistant-dock-input">
        <input
          ref={fieldRef}
          className="assistant-dock-field"
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
        />
        <div className="assistant-dock-blob" aria-hidden="true"><i /><i /><i /><i /></div>
        <button
          type="button"
          className="assistant-dock-btn"
          aria-label="Спросить ассистента"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleBtnClick}
        >
          <span className="assistant-dock-btn-label"><Icon name="spark" size={16} /> Спросить ассистента</span>
          <span className="assistant-dock-miniico"><Icon name="spark" size={16} /></span>
          <Icon name="send" size={22} className="assistant-dock-send" />
        </button>
      </div>
    </div>
  )
})
