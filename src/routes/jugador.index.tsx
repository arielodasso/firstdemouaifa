import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, VerifiedBadge } from "@/components/shell";
import { jugador, carteraJugadores, mensajes } from "@/lib/mock-data";

export const Route = createFileRoute("/jugador/")({
  head: () => ({
    meta: [
      { title: "Panel del jugador — UAIFA CAMP" },
      { name: "description", content: "Perfil, representante actual y estado de la valuación del jugador." },
      { property: "og:title", content: "Panel del jugador — UAIFA CAMP" },
      { property: "og:description", content: "Resumen de mi situación en la plataforma." },
    ],
  }),
  component: PanelJugador,
});

function PanelJugador() {
  const v = carteraJugadores[0]!;

  return (
    <>
      <PageHeader
        title="Panel general"
        description={`${jugador.nombre} — estado de su ficha en el registro de UAIFA.`}
        action={<VerifiedBadge label="Jugador verificado" />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Valuación estimada" value={`USD ${v.valuacionMin}M — ${v.valuacionMax}M`} hint={`Confianza ${v.confianza}%`} />
        <Stat label="Contrato vigente hasta" value={v.contratoHasta} hint={jugador.club} />
        <Stat label="Consultas recibidas" value={String(mensajes.length)} hint="1 sin responder" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Mi perfil">
          <dl className="divide-y divide-border text-sm">
            {[
              ["Posición", jugador.posicion],
              ["Edad", `${jugador.edad} años`],
              ["Nacionalidad", jugador.pais],
              ["Pie hábil", jugador.pieHabil],
              ["Altura", jugador.altura],
            ].map(([k, val]) => (
              <div key={k} className="flex justify-between gap-3 py-2.5">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                <dd className="font-medium text-foreground">{val}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="Mi representante actual">
          <p className="text-sm font-semibold text-foreground">{jugador.agente}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Licencia FIFA Categoría A · Acuerdo de representación vigente hasta 01/2027
          </p>
          <div className="mt-3">
            <VerifiedBadge label="Agente FIFA verificado" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/jugador/vidriera" className="rounded-sm bg-navy px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-foreground">
              Gestionar mi vidriera
            </Link>
            <Link to="/jugador/valuacion" className="rounded-sm border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground hover:bg-muted">
              Ver mi valuación
            </Link>
          </div>
        </Panel>
      </div>
    </>
  );
}
