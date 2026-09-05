import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { PageHeader, Panel, Stat, Tag } from "@/components/shell";
import { plantelClub, solicitudesClubes } from "@/lib/mock-data";

export const Route = createFileRoute("/club/")({
  head: () => ({
    meta: [
      { title: "Panel del club — UAIFA CAMP" },
      { name: "description", content: "Plantel, necesidades de fichaje publicadas y alertas contractuales." },
      { property: "og:title", content: "Panel del club — UAIFA CAMP" },
      { property: "og:description", content: "Estado consolidado del plantel y del mercado del club." },
    ],
  }),
  component: PanelClub,
});

function PanelClub() {
  const propias = solicitudesClubes.filter((s) => s.club === "CD Águilas Doradas");

  return (
    <>
      <PageHeader
        title="Panel general"
        description="CD Águilas Doradas — resumen operativo de plantel y mercado."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Jugadores en plantel" value="27" hint="5 con ficha en revisión" />
        <Stat label="Vencimientos en 6 meses" value="2" hint="Sin renovación registrada" />
        <Stat label="Necesidades publicadas" value={String(propias.length)} hint="Visible para agentes verificados" />
        <Stat label="Propuestas recibidas" value="6" hint="3 de agentes categoría A" />
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-md border border-warning/50 bg-warning/10 p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
        <div className="text-sm">
          <p className="font-semibold text-foreground">Alertas contractuales del plantel</p>
          <p className="mt-1 text-muted-foreground">
            Iker Montenegro y Elías Vergara finalizan contrato en 12/2025. Ambos habilitados para
            negociar con otros clubes a partir de 07/2025.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Plantel profesional" subtitle="Estado contractual">
          <ul className="divide-y divide-border">
            {plantelClub.map((p) => (
              <li key={p.nombre} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.posicion} · {p.edad} años · hasta {p.contratoHasta}
                  </p>
                </div>
                <Tag tone={p.estado === "Vigente" ? "ok" : p.estado === "En revisión" ? "neutral" : "warn"}>
                  {p.estado}
                </Tag>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Necesidades de fichaje abiertas" subtitle="Publicadas por el club">
          <ul className="divide-y divide-border">
            {propias.map((s) => (
              <li key={s.id} className="py-3">
                <p className="text-sm font-semibold text-foreground">{s.perfil}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.presupuesto} · Vence {s.vence}
                </p>
              </li>
            ))}
          </ul>
          <Link to="/club/mercado" className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-navy">
            Publicar nueva necesidad →
          </Link>
        </Panel>
      </div>
    </>
  );
}
