import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat } from "@/components/shell";
import { actividadMensual, cumplimientoAgentes } from "@/lib/mock-data";

export const Route = createFileRoute("/uaifa/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes — UAIFA CAMP" },
      { name: "description", content: "Actividad de la plataforma, patrones de disputa y cumplimiento por agente." },
      { property: "og:title", content: "Reportes — UAIFA CAMP" },
      { property: "og:description", content: "Indicadores institucionales con datos ilustrativos." },
    ],
  }),
  component: Reportes,
});

function Reportes() {
  const maxOps = Math.max(...actividadMensual.map((a) => a.operaciones));
  const maxDis = Math.max(...actividadMensual.map((a) => a.disputas));

  return (
    <>
      <PageHeader
        title="Reportes"
        description="Indicadores de actividad y cumplimiento del registro. Los valores exhibidos son ilustrativos."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Operaciones del semestre" value="2.450" hint="+12% respecto del período anterior" />
        <Stat label="Tasa de disputa" value="1,8%" hint="Sobre operaciones cerradas" />
        <Stat label="Cumplimiento promedio" value="90%" hint="Plazos contractuales informados" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Actividad de la plataforma" subtitle="Operaciones registradas por mes">
          <div className="flex h-44 items-end gap-3">
            {actividadMensual.map((a) => (
              <div key={a.mes} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] text-muted-foreground">{a.operaciones}</span>
                <div className="w-full rounded-t-sm bg-navy" style={{ height: `${(a.operaciones / maxOps) * 100}%` }} />
                <span className="text-[11px] uppercase text-muted-foreground">{a.mes}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Patrones de disputa" subtitle="Disputas abiertas por mes">
          <div className="flex h-44 items-end gap-3">
            {actividadMensual.map((a) => (
              <div key={a.mes} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] text-muted-foreground">{a.disputas}</span>
                <div
                  className="w-full rounded-t-sm bg-[var(--warning)]"
                  style={{ height: `${(a.disputas / maxDis) * 100}%` }}
                />
                <span className="text-[11px] uppercase text-muted-foreground">{a.mes}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Cumplimiento por agente" subtitle="Plazos contractuales informados en término" className="mt-4">
        <ul className="space-y-3">
          {cumplimientoAgentes.map((c) => (
            <li key={c.agente}>
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{c.agente}</span>
                <span className="text-muted-foreground">{c.cumplimiento}%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${c.cumplimiento >= 90 ? "bg-navy" : "bg-[var(--warning)]"}`}
                  style={{ width: `${c.cumplimiento}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
