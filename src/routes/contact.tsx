import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { contactInfo, socials } from "@/data/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FireboxTechs — Have an Idea? Let's Build It" },
      {
        name: "description",
        content:
          "Tell FireboxTechs what you're building and we'll turn your idea into something real. Get a project quote today.",
      },
      { property: "og:title", content: "Contact FireboxTechs" },
      {
        property: "og:description",
        content: "Start your project with FireboxTechs — websites, apps, AI and automation.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Section label="Contact" title="Have an idea? Let's build it.">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card sm:p-5">
          <p className="mb-4 text-sm text-muted-foreground">
            Tell us what you're building and let's turn your idea into something real.
          </p>
          <ContactForm />
        </div>
        <aside className="rounded-xl border border-border bg-card p-4 shadow-card sm:p-5">
          <h2 className="font-display text-lg font-extrabold">Reach us directly</h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              {contactInfo.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              {contactInfo.location}
            </li>
          </ul>
          <h3 className="mt-5 text-sm font-bold">Follow FireboxTechs</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
