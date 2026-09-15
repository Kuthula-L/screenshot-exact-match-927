import { useState } from "react";
import { API_BASE_URL } from "@/lib/config";

type Channel = "email" | "whatsapp" | null;
type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({
  message,
  onMessageChange,
}: {
  message: string;
  onMessageChange: (value: string) => void;
}) {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<Channel>(null);
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const tooShort = message.trim().length > 0 && message.trim().length < 10;
  const canSubmit =
    message.trim().length >= 10 &&
    message.trim().length <= 2000 &&
    channel !== null &&
    detail.trim().length > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE_URL}/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry_text: message.trim(),
          reply_channel: channel,
          contact_detail: detail.trim(),
          ...(name.trim() ? { customer_name: name.trim() } : {}),
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = (await res.json()) as { message?: string };
      setFeedback(data.message ?? "Your enquiry has been received. We'll reply shortly.");
      setStatus("success");
      onMessageChange("");
      setName("");
      setDetail("");
      setChannel(null);
    } catch {
      setFeedback("We couldn't send your enquiry just now.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-card">
        <h3 className="text-xl">Thank you</h3>
        <p className="mt-2 text-sm text-muted-foreground">{feedback}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-gold-500 underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-gold-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          maxLength={2000}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Tell us what you're looking for — item, size, colour."
          className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-gold-500"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className={tooShort ? "text-destructive" : ""}>
            {tooShort ? "At least 10 characters" : "10–2000 characters"}
          </span>
          <span>{message.length} / 2000</span>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium">Preferred reply channel</span>
        <div className="inline-flex rounded-md border border-input p-1">
          {(["email", "whatsapp"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setChannel(option)}
              className={`rounded px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                channel === option
                  ? "bg-navy-900 text-mist"
                  : "text-muted-foreground hover:text-navy-900"
              }`}
            >
              {option === "email" ? "Email" : "WhatsApp"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="detail" className="text-sm font-medium">
          Contact detail
        </label>
        <input
          id="detail"
          required
          disabled={channel === null}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder={
            channel === "whatsapp"
              ? "+27 xx xxx xxxx"
              : channel === "email"
                ? "you@example.com"
                : "Choose a reply channel first"
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-gold-500 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{feedback} Please try again.</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "sending"}
        className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : status === "error" ? "Retry enquiry" : "Send enquiry"}
      </button>
    </form>
  );
}
