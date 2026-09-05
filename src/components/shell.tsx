import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ShieldCheck, LogOut, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/uaifa-logo.png.asset.json";

export type NavItem = { to: string; label: string; icon: LucideIcon };

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-warning" />
      Modo demo — datos ilustrativos
    </span>
  );
}

export function VerifiedBadge({ label = "UAIFA Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-gold/60 bg-gold/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-foreground">
      <ShieldCheck className="h-3.5 w-3.5 text-gold" />
      {label}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
      <div>
        <h1 className="rule-gold text-2xl text-foreground">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-md border border-border bg-card p-5 ${className}`}>
      {title ? (
        <header className="mb-4">
          <h2 className="text-sm text-foreground">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "ok" | "warn" | "risk";
}) {
  const tones = {
    neutral: "border-border bg-muted text-muted-foreground",
    ok: "border-success/40 bg-success/10 text-success",
    warn: "border-warning/50 bg-warning/10 text-[oklch(0.45_0.11_70)]",
    risk: "border-destructive/40 bg-destructive/10 text-destructive",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function RoleShell({
  role,
  roleLabel,
  userName,
  userMeta,
  nav,
}: {
  role: string;
  roleLabel: string;
  userName: string;
  userMeta: string;
  nav: NavItem[];
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="surface-institutional sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-navy-deep px-4 py-5 lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Escudo UAIFA" className="h-11 w-11 rounded-full bg-white/95 p-0.5" />
          <span>
            <span className="block font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
              UAIFA CAMP
            </span>
            <span className="block text-[10px] uppercase tracking-[0.1em] text-navy-foreground/60">
              Certified Agents Market
            </span>
          </span>
        </Link>

        <div className="mt-6 rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">{roleLabel}</p>
          <p className="mt-1 text-sm font-semibold text-navy-foreground">{userName}</p>
          <p className="text-[11px] text-navy-foreground/60">{userMeta}</p>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-white/12 font-semibold text-navy-foreground shadow-[inset_2px_0_0_0_var(--gold)]"
                    : "text-navy-foreground/70 hover:bg-white/8 hover:text-navy-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/"
          className="mt-4 flex items-center gap-2 rounded-sm px-3 py-2 text-[12px] text-navy-foreground/60 transition-colors hover:text-navy-foreground"
        >
          <LogOut className="h-3.5 w-3.5" /> Cerrar sesión de demo
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/95 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3 lg:hidden">
            <img src={logo.url} alt="Escudo UAIFA" className="h-8 w-8" />
            <span className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-[0.14em]">
              UAIFA CAMP
            </span>
          </div>
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:block">
            Sesión {roleLabel} · {role}
          </p>
          <DemoBadge />
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap rounded-sm px-3 py-1.5 text-xs text-muted-foreground data-[status=active]:bg-navy data-[status=active]:text-navy-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-7">
          <Outlet />
        </main>

        <footer className="border-t border-border px-5 py-4 text-[11px] text-muted-foreground">
          UAIFA — Unión de Agentes Intermediarios de Fútbol de América. Prototipo de experiencia con
          datos ilustrativos; no constituye un registro oficial.
        </footer>
      </div>
    </div>
  );
}
