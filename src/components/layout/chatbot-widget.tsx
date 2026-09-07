"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: `Hi! I'm the ${SITE.shortName} assistant. Ask me about our doctors, services, departments, facilities, or health packages.`,
};

const MAX_LENGTH = 800;

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const history = messages.slice(-8).map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data?.error || "Something went wrong. Please try again." },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-elevated)] transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-40 flex h-[min(32rem,70vh)] w-[min(23rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)]"
          >
            <div className="flex items-center gap-3 border-b border-border bg-primary px-5 py-4 text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold">{SITE.shortName} Assistant</p>
                <p className="text-xs text-white/75">Ask about doctors, services & more</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user" ? "bg-primary text-white" : "bg-bg-secondary text-text"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-bg-secondary px-4 py-2.5 text-sm text-text-muted">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Typing…
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                maxLength={MAX_LENGTH}
                className="flex-1 rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-deep disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
