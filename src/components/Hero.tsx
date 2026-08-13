import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock, Sparkles } from "lucide-react";
import heroDevices from "@/assets/hero-devices.png";

const benefits = [
  { icon: Sparkles, label: "Modern Solutions" },
  { icon: BadgeCheck, label: "Quality First" },
  { icon: Clock, label: "On Time Delivery" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ backgroundImage: "var(--gradient-primary)" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-12">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome to FireboxTechs
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
            We Build <span className="text-gradient">Digital Solutions</span> That Matter.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            We help businesses and individuals transform ideas into powerful digital products,
            websites, applications and intelligent solutions.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Explore Our Works
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Contact Us
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {benefits.map((b) => (
              <li key={b.label} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <b.icon className="h-4 w-4 text-primary" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-6 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
          <img
            src={heroDevices}
            alt="FireboxTechs dashboard shown on a laptop and smartphone"
            width={1200}
            height={900}
            className="relative w-full drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
