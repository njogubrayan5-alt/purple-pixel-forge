import { useState } from "react";
import { Check, Send } from "lucide-react";
import { services } from "@/data/services";

const field =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [sent, setSent] = useState(false);

  // TODO: replace with a POST to the FireboxTechs Admin API (contact messages).
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          <Send className="h-4 w-4" />
          Send Message
        </button>
        {sent && (
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Check className="h-4 w-4" /> Thanks — we'll be in touch shortly.
          </p>
        )}
      </div>
    </form>
  );
}
