"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { FlaskConical, Play, Send, Moon, Sun, Copy } from "lucide-react"

// Helpers
function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function BrandHeader() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    const initialDark =
      stored === "dark" ||
      (!stored &&
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      (typeof document !== "undefined" && document.documentElement.classList.contains("dark"))
    setIsDark(Boolean(initialDark))
    if (initialDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto max-w-6xl px-5 py-2.5">
        <div className="flex items-center justify-center gap-2 lg:justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div className="inline-flex items-center gap-2 rounded-2xl border bg-card px-2.5 py-1.5 shadow-sm">
            <FlaskConical className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">the Catalyst</span>
            <span className="sr-only">the Catalyst logo</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function CodeEditorCard({ onRun }: { onRun: () => void }) {
  const linesPlain: string[] = [
    "import torch",
    "import torch.nn as nn",
    "import torch.optim as optim",
    "from torch.utils.data import DataLoader",
    "",
    "class Net(nn.Module):",
    "    def __init__(self, in_dim=784, hidden=128, out_dim=10):",
    "        super().__init__()",
    "        self.net = nn.Sequential(",
    "            nn.Linear(in_dim, hidden),",
    "            nn.ReLU(),",
    "            nn.Linear(hidden, out_dim),",
    "        )",
    "",
    "    def forward(self, x):",
    "        return self.net(x)",
    "",
    "model = Net()",
    "criterion = nn.CrossEntropyLoss()",
    "optimizer = optim.Adam(model.parameters(), lr=1e-3)",
    "",
    "for epoch in range(1, 4):",
    "    running = 0.0",
    "    for step, (x, y) in enumerate(loader):",
    "        x = x.view(x.size(0), -1)",
    "        logits = model(x)",
    "        loss = criterion(logits, y)",
    "        optimizer.zero_grad()",
    "        loss.backward()",
    "        optimizer.step()",
    "        running += loss.item()",
    "        if (step + 1) % 50 == 0:",
    '            print(f"epoch={epoch} step={step+1} loss={running/50:.4f}")',
  ]
  const lines: React.ReactNode[] = linesPlain.map((l, i) => {
    // naive faux syntax styling for keywords
    const k = (w: string, cls: string) => <span className={cls}>{w}</span>
    if (l.startsWith("import")) {
      return (
        <React.Fragment key={i}>
          {k("import", "text-sky-700")} <span className="text-foreground">{l.slice(7)}</span>
        </React.Fragment>
      )
    }
    if (l.startsWith("from ")) {
      return (
        <React.Fragment key={i}>
          {k("from", "text-sky-700")} <span className="text-foreground">{l.slice(5)}</span>
        </React.Fragment>
      )
    }
    if (l.startsWith("class ")) {
      return (
        <React.Fragment key={i}>
          {k("class", "text-sky-700")} <span className="text-foreground">{l.slice(6)}</span>
        </React.Fragment>
      )
    }
    if (l.trim().startsWith("def ")) {
      const idx = l.indexOf("def ")
      return (
        <React.Fragment key={i}>
          <span className="text-muted-foreground">{l.slice(0, idx)}</span>
          {k("def", "text-sky-700")} <span className="text-foreground">{l.slice(idx + 4)}</span>
        </React.Fragment>
      )
    }
    if (l.trim().startsWith("for ") || l.trim().startsWith("if ")) {
      const t = l.trim()
      const leading = l.slice(0, l.indexOf(t))
      const w = t.split(/\s+/)[0]
      return (
        <React.Fragment key={i}>
          <span className="text-muted-foreground">{leading}</span>
          {k(w, "text-sky-700")} <span className="text-foreground">{t.slice(w.length + 1)}</span>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment key={i}>{l === "" ? <>&nbsp;</> : <span className="text-foreground">{l}</span>}</React.Fragment>
    )
  })

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(linesPlain.join("\n"))
    } catch {
      // noop
    }
  }

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 rounded-md"
              onClick={copyAll}
              aria-label="Copy code"
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-xs">Copy</span>
            </Button>
            <Button type="button" size="sm" className="h-8 px-3 rounded-md" onClick={onRun} aria-label="Run code">
              <Play className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-xs">Run</span>
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[360px] md:h-[520px]">
          <pre className="m-0 px-3 py-2.5 font-mono text-[14px] leading-[1.5]">
            {lines.map((content, idx) => {
              const striped = Math.floor(idx / 2) % 2 === 1
              return (
                <div
                  key={idx}
                  className={["grid grid-cols-[auto,1fr] items-baseline", striped ? "bg-muted/20" : ""].join(" ")}
                >
                  <code
                    className="select-none pr-4 text-right text-xs text-muted-foreground border-r border-border"
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </code>
                  <code className="whitespace-pre text-foreground pl-4">{content}</code>
                </div>
              )
            })}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function MediaPlayerCard({
  mode,
  setMode,
  logs,
  isRunning,
}: {
  mode: "video" | "terminal"
  setMode: (m: "video" | "terminal") => void
  logs: string[]
  isRunning: boolean
}) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const DURATION = 4 * 60 + 42
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    // pause when switching to terminal
    if (mode === "terminal") setIsPlaying(false)
  }, [mode])

  React.useEffect(() => {
    if (!isPlaying || mode !== "video") return
    let raf = 0
    const start = performance.now()
    const base = progress
    const tick = (t: number) => {
      const elapsed = (t - start) / 1000
      const frac = Math.min(1, elapsed / DURATION + base / 100)
      const pct = Math.min(100, frac * 100)
      setProgress(pct)
      if (pct < 100 && isPlaying) {
        raf = requestAnimationFrame(tick)
      } else {
        setIsPlaying(false)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isPlaying, mode])

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-2.5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">Lesson</h2>
          <div className="relative">
            {/* slider pill */}
            <div className="relative flex items-center rounded-full border px-1 py-1 bg-card">
              <button
                type="button"
                className={[
                  "relative z-10 rounded-full px-2.5 py-1 text-xs",
                  mode === "video" ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
                onClick={() => setMode("video")}
                aria-pressed={mode === "video"}
              >
                Video
              </button>
              <button
                type="button"
                className={[
                  "relative z-10 rounded-full px-2.5 py-1 text-xs",
                  mode === "terminal" ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
                onClick={() => setMode("terminal")}
                aria-pressed={mode === "terminal"}
              >
                Terminal
              </button>
              <span
                className={[
                  "absolute inset-y-0 my-auto h-6 w-1/2 rounded-full bg-muted transition-transform",
                  mode === "terminal" ? "translate-x-full" : "translate-x-0",
                ].join(" ")}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
          {mode === "video" ? (
            <div className="absolute inset-0 grid place-items-center">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-12 w-12 rounded-full shadow-sm"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={() => setIsPlaying((p) => !p)}
              >
                <Play className="h-6 w-6" />
              </Button>
            </div>
          ) : (
            <div className="absolute inset-0 p-3">
              <div className="h-full w-full overflow-hidden rounded-md border bg-background">
                <ScrollArea className="h-full">
                  <pre className="m-0 px-3 py-2.5 font-mono text-[12px] leading-6 text-foreground">
                    {logs.length === 0 ? (
                      <span className="text-muted-foreground">Waiting for execution…</span>
                    ) : (
                      logs.map((l, i) => (
                        <div key={i} className="whitespace-pre-wrap">
                          {l}
                        </div>
                      ))
                    )}
                  </pre>
                </ScrollArea>
              </div>
              {isRunning ? (
                <div className="absolute bottom-2 right-3 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow">
                  Running…
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="mt-2.5 flex items-center gap-4">
          <span className="w-10 shrink-0 text-xs text-muted-foreground">0:00</span>
          <Progress value={progress} className="h-[6px] flex-1 rounded-full" />
          <span className="w-10 shrink-0 text-xs text-muted-foreground">4:42</span>
        </div>
      </CardContent>
    </Card>
  )
}

function AICommentsCard() {
  const comments = [
    { line: 21, text: "Consider using torch.compile() for potential speedups on supported PyTorch versions." },
    { line: 19, text: "Exposing lr via an argument will let you sweep without editing code." },
    { line: 27, text: "Accumulate loss per batch and log with a moving average to smooth noise." },
  ]
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-2.5">
        <h2 className="mb-2 text-sm font-medium text-foreground">AI Comments</h2>
        <ul className="space-y-2">
          {comments.map((c, i) => (
            <li key={i} className="rounded-lg border bg-card px-2.5 py-2 text-xs">
              <span className="mr-2 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                L{c.line}
              </span>
              <span className="text-foreground">{c.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function ResearchPanelCard() {
  const papers = [
    {
      title: "Attention Is All You Need",
      abstract:
        "Introduces the Transformer architecture, dispensing with recurrence and convolutions entirely for sequence modeling.",
      url: "https://arxiv.org/abs/1706.03762",
    },
    {
      title: "Deep Residual Learning for Image Recognition",
      abstract:
        "Proposes residual learning to ease training of deeper networks, enabling very deep architectures to converge.",
      url: "https://arxiv.org/abs/1512.03385",
    },
    {
      title: "Neural Machine Translation by Jointly Learning to Align and Translate",
      abstract:
        "Presents an attention mechanism that jointly learns alignment and translation, improving machine translation quality.",
      url: "https://arxiv.org/abs/1409.0473",
    },
  ]
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-2.5">
        <h2 className="mb-2 text-sm font-medium text-foreground">Research</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Paper Preview */}
          <a
            href="https://arxiv.org/pdf/1706.03762"
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-xl border bg-card"
            aria-label="Open uploaded paper in a new window"
          >
            <div className="aspect-[4/3] w-full bg-muted grid place-items-center">
              <img
                src="/paper-thumbnail.png"
                alt="Uploaded paper preview"
                className="h-24 w-32 rounded-md object-cover"
              />
            </div>
            <div className="flex items-center justify-between border-t px-3 py-2">
              <span className="text-xs text-foreground">Open in new window</span>
              <span className="text-xs text-muted-foreground group-hover:underline">arXiv PDF</span>
            </div>
          </a>

          {/* Paper List */}
          <div className="space-y-2">
            {papers.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-xl border bg-card px-3 py-2 transition-transform hover:scale-[1.02]"
              >
                <div className="text-sm font-medium text-foreground">{p.title}</div>
                <div className="mt-1 hidden text-xs text-muted-foreground group-hover:block">{p.abstract}</div>
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type ChatMessage = {
  id: string
  role: "inbound" | "outbound"
  text: string
  timestamp?: string
}

function ChatCard() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "m1",
      role: "inbound",
      text: "Why do we use this line?",
      timestamp: "12:08 PM",
    },
  ])
  const [input, setInput] = React.useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const outbound: ChatMessage = {
      id: crypto.randomUUID(),
      role: "outbound",
      text: trimmed,
    }
    setMessages((m) => [...m, outbound])
    setInput("")

    setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "inbound",
        text: "Got it.",
      }
      setMessages((m) => [...m, reply])
    }, 1000)
  }

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-3">
        <h2 className="mb-3 text-sm font-medium text-foreground">Chat</h2>

        <div className="mb-4 space-y-3" role="list" aria-label="Chat messages" aria-live="polite">
          {messages.map((m) => {
            const isInbound = m.role === "inbound"
            return (
              <div
                key={m.id}
                className={["flex", isInbound ? "justify-start" : "justify-end"].join(" ")}
                role="listitem"
              >
                <div className="space-y-1">
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                      isInbound ? "bg-muted text-foreground" : "bg-primary text-primary-foreground",
                    ].join(" ")}
                  >
                    {m.text}
                  </div>
                  {isInbound && m.timestamp ? (
                    <div className="pr-2 text-right">
                      <span className="text-[11px] text-muted-foreground">{m.timestamp}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2" aria-label="Send a chat message">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            className="rounded-xl"
            aria-label="Message input"
          />
          <Button type="submit" size="icon" variant="ghost" className="rounded-full" aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function Page() {
  const [mode, setMode] = React.useState<"video" | "terminal">("video")
  const [logs, setLogs] = React.useState<string[]>([])
  const [isRunning, setIsRunning] = React.useState(false)

  const handleRun = React.useCallback(() => {
    setMode("terminal")
    setIsRunning(true)
    setLogs([])
    const sequence = [
      "$ python train.py",
      "Using device: cpu",
      "Epoch 1/3 | step 50 | loss=0.7321",
      "Epoch 1/3 | step 100 | loss=0.5210",
      "Epoch 2/3 | step 50 | loss=0.4318",
      "Epoch 2/3 | step 100 | loss=0.3892",
      "Epoch 3/3 | step 50 | loss=0.3411",
      "Epoch 3/3 | step 100 | loss=0.3187",
      "Saving model to ./checkpoints/net.pt",
      "Process exited (0)",
    ]
    let i = 0
    const id = setInterval(() => {
      setLogs((prev) => [...prev, sequence[i]])
      i += 1
      if (i >= sequence.length) {
        clearInterval(id)
        setIsRunning(false)
      }
    }, 350)
  }, [])

  return (
    <div className="font-sans text-foreground">
      <BrandHeader />
      <main className="mx-auto max-w-6xl px-5 py-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <section className="lg:col-span-7 space-y-5">
            <CodeEditorCard onRun={handleRun} />
            <AICommentsCard />
          </section>

          <aside className="lg:col-span-5">
            <div className="flex flex-col gap-5">
              <MediaPlayerCard mode={mode} setMode={setMode} logs={logs} isRunning={isRunning} />
              <ChatCard />
              <ResearchPanelCard />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
