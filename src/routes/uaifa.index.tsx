import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tag } from "@/components/shell";
import { metricasUaifa, colaVerificacion, actividadMensual } from "@/lib/mock-data";

export const Route = createFileRoute("/uaifa/")({
  head: () => ({
    meta: [
      { title: "Panel institucional — UAIFA CAMP" },
      { name: "description", content: "Métricas generales de la plataforma: agentes activos, verificaciones pendientes y disputas abiertas." },
      { property: "og:title", content: "Panel institucional — UAIFA CAMP" },
      { property: "og:description", content: "Estado consolidado del registro y del cumplimiento." },
    ],
  }),
  component: PanelUaifa,
});

function PanelUaifa() {
  const max = Math.max(...actividadMensual.map((a) => a.operaciones));

  return (
    <>
      <PageHeader
        title="Panel institucional"
        description="Estado general del registro de intermediarios, clubes y jugadores de UAIFA CAMP."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricasUaifa.map((m) => (
          <Stat key={m.label} label={m.label} value={m.valor} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Operaciones registradas por mes" subtitle="Últimos seis meses">
          <div className="flex h-48 items-end gap-3">
            {actividadMensual.map((a) => (
              <div key={a.mes} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] text-muted-foreground">{a.operaciones}</span>
                <div
                  className="w-full rounded-t-sm bg-navy"
                  style={{ height: `${(a.operaciones / max) * 100}%` }}
                />
                <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{a.mes}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Cola de verificación" subtitle="Solicitudes pendientes de resolución">
          <ul className="divide-y divide-border">
            {colaVerificacion.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.solicitante}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.tipo} · {c.pais} · Ingresó {c.ingreso}
                  </p>
                </div>
                <Tag tone="warn">Pendiente</Tag>
              </li>
            ))}
          </ul>
          <Link to="/uaifa/verificacion" className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-navy">
            Gestionar verificaciones →
          </Link>
        </Panel>
      </div>
    </>
  );
}
