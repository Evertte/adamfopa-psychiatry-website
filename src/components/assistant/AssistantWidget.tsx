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
  { label: "Fees & Insurance", prompt: "Insurance & payment options?" },
  { label: "New patient steps", prompt: "How do new patients start?" },
  { label: "Telehealth vs in-person", prompt: "Telehealth vs in-person options?" },
  { label: "Cancellation policy", prompt: "Cancellation policy?" },
  { label: "Request appointment", prompt: "How do I request an appointment?" },
  { label: "Medication refills", prompt: "Medication refills between visits?" },
  { label: "Scheduling", prompt: "How far out are new appointments?" },
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

  const showSuggestions =
    !loading &&
    (messages.length === 0 ||
      messages[messages.length - 1]?.role === "assistant" ||
      Boolean(error));

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-20 right-4 left-auto z-[70] flex h-[520px] max-h-[80vh] w-[340px] max-w-[92vw] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all motion-reduce:transition-none md:bottom-24 md:right-6 md:w-[380px]"
          onWheelCapture={(e) => e.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between bg-teal-500 px-5 py-4 text-white">
            <div className="flex items-center gap-3 text-base font-semibold">
              <Sparkles className="h-5 w-5" aria-hidden />
              <span>Info Assistant</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/20">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Online
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white/90 transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
            <div
              className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
              onWheelCapture={(e) => e.stopPropagation()}
              aria-live="polite"
            >
              {messages.length === 0 && (
                <>
                  <p className="text-base font-medium text-slate-600">
                    👋 Hi! How can we help today?
                  </p>
                  <p className="text-xs text-slate-500">
                    General info only. Not for emergencies.
                  </p>
                </>
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

              {showSuggestions && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((chip) => (
                    <button
                      key={chip.prompt}
                      type="button"
                      onClick={() => handleSuggestion(chip.prompt)}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-200 motion-reduce:transition-none"
                    >
                      {chip.prompt}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {error ? (
              <div className="px-5 pb-2">
                <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
                  {error}
                </div>
              </div>
            ) : null}

            <form
              className="shrink-0 border-t border-slate-200 px-5 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSend();
              }}
            >
              <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-4 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-200">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void handleSend();
                    }
                  }}
                  rows={1}
                  placeholder="Type your message..."
                  aria-label="Message"
                  className="flex-1 resize-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
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
