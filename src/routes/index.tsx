import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Building2, User, Landmark } from "lucide-react";
import logo from "@/assets/uaifa-logo.png.asset.json";
import { DemoBadge } from "@/components/shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UAIFA CAMP — Certified Agents Market Platform" },
      {
        name: "description",
        content:
          "Prototipo institucional de la plataforma de mercado de fútbol de UAIFA: agentes verificados, valuación dual, semillero +16 y evidencia auditada.",
      },
      { property: "og:title", content: "UAIFA CAMP — Certified Agents Market Platform" },
      {
        property: "og:description",
        content:
          "Ingreso por perfil: Agente, Club, Jugador e institucional UAIFA. Datos ilustrativos de demostración.",
      },
    ],
  }),
  component: Ingreso,
});

const perfiles = [
  {
    to: "/agente",
    label: "Agente",
    icon: Briefcase,
    desc: "Cartera de jugadores, valuación dual, negociaciones y evidencia de operaciones.",
  },
  {
    to: "/club",
    label: "Club",
    icon: Building2,
    desc: "Directorio de agentes verificados, scouting +16 y due diligence previa al fichaje.",
  },
  {
    to: "/jugador",
    label: "Jugador",
    icon: User,
    desc: "Vidriera propia, historial verificado y control de privacidad de la valuación.",
  },
  {
    to: "/uaifa",
    label: "UAIFA",
    icon: Landmark,
    desc: "Gestión de verificaciones, ledger de evidencia y reportes de cumplimiento.",
  },
];

function Ingreso() {
  return (
    <div className="surface-institutional flex min-h-screen flex-col items-center justify-center px-5 py-14">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <img
            src={logo.url}
            alt="Escudo de la Unión de Agentes Intermediarios de Fútbol de América"
            className="h-28 w-28 rounded-full bg-white p-1"
          />
          <h1 className="mt-6 text-3xl text-navy-foreground sm:text-4xl">UAIFA CAMP</h1>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Certified Agents Market Platform
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-foreground/70">
            Plataforma de mercado respaldada institucionalmente por la Unión de Agentes
            Intermediarios de Fútbol de América, reconocida por FIFA. Seleccione el perfil con el
            que desea recorrer la experiencia.
          </p>
          <div className="mt-5">
            <DemoBadge />
          </div>
        </div>

        <h2 className="mt-12 text-center text-xs tracking-[0.2em] text-navy-foreground/60">
          Ingresar como
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {perfiles.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group rounded-md border border-white/12 bg-white/6 p-5 transition-colors hover:border-gold/60 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 bg-white/10">
                  <p.icon className="h-5 w-5 text-gold" />
                </span>
                <h3 className="text-base text-navy-foreground">{p.label}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-foreground/70">{p.desc}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Iniciar sesión de demostración →
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] leading-relaxed text-navy-foreground/50">
          Prototipo de experiencia para presentación a stakeholders. Los datos exhibidos son
          ilustrativos y no representan operaciones reales.
        </p>
      </div>
    </div>
  );
}
