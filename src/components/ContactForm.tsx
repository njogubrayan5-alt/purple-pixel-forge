import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/lib/site-content-query";

const field =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const { services } = useSiteContent();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      service: String(data.get("service") ?? "") || null,
      message: String(data.get("message") ?? ""),
    });
    setSending(false);
    if (error) {
      toast.error("Message could not be sent. Please try again.");
      return;
    }
    setSent(true);
    toast.success("Message sent — we'll be in touch shortly.");
    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-1 block text-xs font-semibold">
          Name
        </label>
        <input id="name" name="name" required placeholder="Your name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="service" className="mb-1 block text-xs font-semibold">
          Service
        </label>
        <select id="service" name="service" defaultValue={defaultService ?? ""} className={field}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block text-xs font-semibold">
          Project description
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us what you're building…"
          className={field}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-70 sm:w-auto"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {sending ? "Sending…" : "Send Message"}
        </button>
        {sent && !sending && (
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Check className="h-4 w-4" /> Thanks — we'll be in touch shortly.
          </p>
        )}
      </div>
    </form>
  );
}
