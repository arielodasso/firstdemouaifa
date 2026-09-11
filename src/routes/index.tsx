import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Scale, ShieldCheck, Sprout } from "lucide-react";
import logo from "@/assets/uaifa-logo.png.asset.json";
import { heroEstadio } from "@/lib/media";
import { ClubInline, JugadorInline, RetratoAgente } from "@/components/ficha";
import { ligas, listaAgentes, topValores, valorPlantel } from "@/lib/futbol-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UAIFA CAMP — Mercado de fútbol con agentes certificados" },
      {
        name: "description",
        content:
          "Plataforma institucional de UAIFA: agentes certificados, valuación dual auditada, semillero +16 y exploración abierta de competencias, planteles y jugadores.",
      },
      { property: "og:title", content: "UAIFA CAMP — Mercado de fútbol con agentes certificados" },
      {
        property: "og:description",
        content:
          "Explorá competencias, clubes y jugadores, y conocé el registro de agentes certificados de UAIFA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const pilares = [
  {
    icon: BadgeCheck,
    titulo: "Agentes certificados",
    desc: "Registro de intermediarios con licencia vigente, jurisdicción declarada e historial operacional auditable.",
  },
  {
    icon: Scale,
    titulo: "Valuación dual",
    desc: "Valor estimado de mercado y valor verificado con evidencia documental, con visibilidad controlada por el titular.",
  },
  {
    icon: Sprout,
    titulo: "Semillero +16",
    desc: "Espacio reglado de observación de juveniles, con trazabilidad de contactos y resguardo del interés del menor.",
  },
  {
    icon: ShieldCheck,
    titulo: "Evidencia custodiada",
    desc: "UAIFA no arbitra disputas: custodia evidencia verificada e inmutable de cada operación registrada.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-navy-deep text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
              <img src={logo.url} alt="Escudo de UAIFA" className="h-7 w-7 object-contain" />
            </span>
            <span className="font-display text-sm uppercase tracking-[0.06em]">UAIFA CAMP</span>
          </div>
          <nav className="ml-auto flex items-center gap-4 text-xs uppercase tracking-[0.08em]">
            <Link to="/explorar" className="hover:underline">
              Explorar
            </Link>
            <Link
              to="/inicio"
              className="rounded-sm bg-gold px-3 py-1.5 font-semibold text-gold-foreground"
            >
              Ingresar
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-navy-deep text-navy-foreground">
        <img
          src={heroEstadio}
          alt="Estadio de fútbol durante un partido nocturno"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <span className="inline-flex items-center gap-2 rounded-sm bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-foreground">
            Modo demo — datos ilustrativos
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl uppercase leading-tight sm:text-5xl">
            Certified Agents Market Platform
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-foreground/85">
            El mercado de pases del fútbol americano gestionado bajo estándar institucional: agentes
            con licencia verificada, clubes afiliados y jugadores con ficha auditada. Respaldada por
            la Unión de Agentes Intermediarios de Fútbol de América.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/explorar"
              className="rounded-sm bg-gold px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-foreground"
            >
              Explorar competencias
            </Link>
            <Link
              to="/inicio"
              className="rounded-sm border border-navy-foreground/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em]"
            >
              Ingresar a la plataforma
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-xl uppercase text-foreground">Qué garantiza la plataforma</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((p) => (
            <article key={p.titulo} className="border border-border bg-card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-sm uppercase text-foreground">{p.titulo}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-xl uppercase text-foreground">Competencias registradas</h2>
            <Link
              to="/explorar"
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-navy underline-offset-2 hover:underline"
            >
              Ver todas
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {ligas.map((l) => (
              <article key={l.liga} className="border border-border bg-card p-5">
                <h3 className="font-display text-sm uppercase text-foreground">{l.liga}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{l.pais}</p>
                <ul className="mt-3 divide-y divide-border">
                  {l.clubes.map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                      <ClubInline clubId={c.id} nombre={c.nombre} base="/explorar" size={24} />
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        USD {valorPlantel(c.id).toFixed(1)}M
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl uppercase text-foreground">
              Jugadores más valorados
            </h2>
            <ol className="mt-5 divide-y divide-border border border-border bg-card">
              {topValores.slice(0, 8).map((j, i) => (
                <li key={j.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                  <span className="w-4 text-xs text-muted-foreground">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <JugadorInline id={j.id} nombre={j.nombre} base="/explorar" size={32} />
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {j.posicion} · {j.edad} años · {j.pais}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-semibold">USD {j.valorM}M</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase text-foreground">Agentes certificados</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {listaAgentes.map((a) => (
                <li key={a.id} className="border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <RetratoAgente id={a.id} size={44} />
                    <div className="min-w-0">
                      <Link
                        to="/explorar/representante/$agenteId"
                        params={{ agenteId: a.id }}
                        className="text-sm font-semibold text-navy underline-offset-2 hover:underline"
                      >
                        {a.nombre}
                      </Link>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{a.region}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground">{a.especializacion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-navy-deep py-14 text-navy-foreground">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-2xl uppercase">Ingresá con tu perfil</h2>
          <p className="mt-3 text-sm text-navy-foreground/85">
            Agente, Club, Jugador o equipo institucional de UAIFA. Cada perfil accede únicamente a
            la información y a los procesos que le corresponden.
          </p>
          <Link
            to="/inicio"
            className="mt-6 inline-block rounded-sm bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-foreground"
          >
            Ingresar a la plataforma
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Prototipo de experiencia para presentación a stakeholders. Los datos exhibidos son
        ilustrativos y no representan operaciones reales.
      </footer>
    </div>
  );
}
