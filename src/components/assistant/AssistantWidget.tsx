"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Source = { title: string; slug: string };

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const suggestions: { label: string; prompt: string }[] = [
  { label: "Fees & Insurance", prompt: "What insurance do you accept and how do payments work?" },
  { label: "New patient steps", prompt: "How do new patients get started?" },
  { label: "Telehealth vs in-person", prompt: "When can I choose telehealth vs in-person visits?" },
  { label: "Cancellation policy", prompt: "What is your cancellation policy?" },
  { label: "Request appointment", prompt: "How do I request an appointment?" },
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleOpen = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const historyPayload = useMemo(
    () =>
      messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    [messages],
  );

  const handleSend = async (promptText?: string) => {
    const prompt = (promptText ?? input).trim();
    if (!prompt || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          history: [...historyPayload, { role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as {
        answer?: string;
        sources?: Source[];
      };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            typeof data.answer === "string"
              ? data.answer
              : "I’m here to help with practice information.",
          sources: Array.isArray(data.sources) ? data.sources : [],
        },
      ]);
    } catch (err) {
      console.error(err);
      setError(
        "Sorry, something went wrong. Please try again or reach out through the contact page.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
    void handleSend(prompt);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-20 right-4 left-auto z-[70] flex h-[460px] w-[340px] max-w-[92vw] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all motion-reduce:transition-none md:bottom-24 md:right-6 md:w-[380px]"
          onWheelCapture={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-3 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
              <Sparkles className="h-5 w-5" aria-hidden />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">
                  Practice Info Assistant
                </p>
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-600">
                General practice information only. Not for emergencies.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="flex h-full min-w-0 flex-col gap-3 px-4 py-3">
            <div className="flex min-w-0 flex-wrap gap-2">
              {suggestions.map((chip) => (
                <button
                  key={chip.prompt}
                  type="button"
                  onClick={() => handleSuggestion(chip.prompt)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-200 motion-reduce:transition-none"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div
              className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain rounded-2xl bg-slate-50 px-3 py-4 ring-1 ring-slate-200"
              onWheelCapture={(e) => e.stopPropagation()}
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  Ask about fees, insurance, telehealth, scheduling, or policies. For emergencies, call 911 or 988.
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={`${msg.role}-${idx}-${msg.content.slice(0, 12)}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ring-1 ${
                      msg.role === "user"
                        ? "bg-teal-500 text-slate-950 ring-teal-200"
                        : "bg-white text-slate-800 ring-slate-200"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                    {msg.sources?.length ? (
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-slate-700">Sources:</span>
                        {msg.sources.map((source) => (
                          <a
                            key={`${source.slug}-${source.title}`}
                            href={source.slug}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-teal-700 ring-1 ring-slate-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-200"
                          >
                            {source.title}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {error ? (
              <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
                {error}
              </div>
            ) : null}

            <form
              className="flex min-w-0 flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSend();
              }}
            >
              <label className="text-xs font-semibold text-slate-600">
                Ask a question
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-teal-300 focus-within:ring-2 focus-within:ring-teal-200">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                  placeholder="Type your message..."
                  className="flex-1 resize-none bg-transparent text-sm text-slate-900 outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
                  <span className="sr-only">Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-[70] md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={toggleOpen}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-teal-200 transition hover-lift hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-200 motion-reduce:transform-none motion-reduce:transition-none"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
          {open ? "Close" : "Ask a question"}
        </button>
      </div>
    </>
  );
}
