import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { historialCarrera } from "@/lib/mock-data";

export const Route = createFileRoute("/jugador/historial")({
  head: () => ({
    meta: [
      { title: "Mi historial de carrera — UAIFA CAMP" },
      { name: "description", content: "Línea de tiempo verificada de la trayectoria del jugador." },
      { property: "og:title", content: "Mi historial de carrera — UAIFA CAMP" },
      { property: "og:description", content: "Eventos validados por UAIFA, sin reconstrucción de prensa." },
    ],
  }),
  component: Historial,
});

function Historial() {
  return (
    <>
      <PageHeader
        title="Mi historial de carrera"
        description="Trayectoria construida con eventos validados por UAIFA. Ningún asiento puede ser modificado ni eliminado una vez registrado."
      />

      <Panel>
        <ol className="relative space-y-6 border-l border-border pl-6">
          {historialCarrera.map((h) => (
            <li key={h.fecha} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-card bg-navy" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {h.fecha}
                </span>
                <Tag tone={h.tipo === "Disputa" ? "warn" : "neutral"}>{h.tipo}</Tag>
              </div>
              <p className="mt-1 text-sm font-semibold text-foreground">{h.evento}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{h.detalle}</p>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
