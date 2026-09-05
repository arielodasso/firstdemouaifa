import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { solicitudesClubes } from "@/lib/mock-data";

export const Route = createFileRoute("/agente/networking")({
  head: () => ({
    meta: [
      { title: "Networking — UAIFA CAMP" },
      { name: "description", content: "Solicitudes abiertas de clubes y propuesta de jugadores de la cartera." },
      { property: "og:title", content: "Networking — UAIFA CAMP" },
      { property: "og:description", content: "Necesidades de fichaje publicadas por clubes verificados." },
    ],
  }),
  component: Networking,
});

function Networking() {
  const [propuestas, setPropuestas] = useState<string[]>([]);

  return (
    <>
      <PageHeader
        title="Networking"
        description="Necesidades de fichaje publicadas por clubes verificados. Al proponer un jugador, el club recibe su ficha estimada y el perfil del intermediario."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {solicitudesClubes.map((r) => {
          const enviada = propuestas.includes(r.id);
          return (
            <Panel key={r.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base text-foreground">{r.club}</h3>
                  <p className="text-xs text-muted-foreground">{r.pais}</p>
                </div>
                <Tag>Vence {r.vence}</Tag>
              </div>
              <p className="mt-3 text-sm text-foreground">{r.perfil}</p>
              <p className="mt-2 text-xs text-muted-foreground">Presupuesto: {r.presupuesto}</p>
              <button
                onClick={() => setPropuestas((p) => (enviada ? p.filter((i) => i !== r.id) : [...p, r.id]))}
                className={`mt-4 rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  enviada
                    ? "border border-success/40 bg-success/10 text-success"
                    : "bg-navy text-navy-foreground hover:opacity-90"
                }`}
              >
                {enviada ? "Propuesta enviada" : "Proponer jugador"}
              </button>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
