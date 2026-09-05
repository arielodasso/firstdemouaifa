import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, ShieldAlert } from "lucide-react";
import { PageHeader, Panel, VerifiedBadge } from "@/components/shell";
import { agentesDirectorio, carteraJugadores } from "@/lib/mock-data";

export const Route = createFileRoute("/club/verificacion")({
  head: () => ({
    meta: [
      { title: "Sello UAIFA Verified — UAIFA CAMP" },
      { name: "description", content: "Consulta rápida del estado de verificación de un agente o jugador antes de negociar." },
      { property: "og:title", content: "Sello UAIFA Verified — UAIFA CAMP" },
      { property: "og:description", content: "Confirme la verificación activa de una contraparte." },
    ],
  }),
  component: Verificacion,
});

const registro = [
  ...agentesDirectorio.map((a) => ({ nombre: a.nombre, tipo: "Agente", verificado: a.verificado, detalle: `${a.licencia} · ${a.region}` })),
  ...carteraJugadores.map((j) => ({ nombre: j.nombre, tipo: "Jugador", verificado: j.verificada, detalle: `${j.posicion} · ${j.club}` })),
];

function Verificacion() {
  const [q, setQ] = useState("");
  const resultados = q.length > 1 ? registro.filter((r) => r.nombre.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <>
      <PageHeader
        title="Sello UAIFA Verified"
        description="Verifique el estado de registro de una contraparte antes de iniciar una negociación. La consulta no expone datos contractuales."
      />

      <Panel>
        <label className="block text-xs text-muted-foreground">
          Nombre del agente o jugador
          <div className="mt-1 flex items-center gap-2 rounded-sm border border-input bg-card px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ej.: Martín Solari Estévez"
              className="w-full bg-transparent py-2 text-sm text-foreground outline-none"
            />
          </div>
        </label>

        <div className="mt-4 space-y-2">
          {resultados.map((r) => (
            <div key={r.nombre} className="flex items-center justify-between gap-3 rounded-sm border border-border p-3">
              <div className="flex items-center gap-3">
                {r.verificado ? (
                  <ShieldCheck className="h-5 w-5 text-gold" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-warning" />
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.tipo} · {r.detalle}
                  </p>
                </div>
              </div>
              {r.verificado ? (
                <VerifiedBadge label="Verificación activa" />
              ) : (
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-warning">
                  Sin verificación activa
                </span>
              )}
            </div>
          ))}
          {q.length > 1 && resultados.length === 0 ? (
            <p className="rounded-sm border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
              Sin coincidencias en el registro de UAIFA.
            </p>
          ) : null}
          {q.length <= 1 ? (
            <p className="text-xs text-muted-foreground">
              Ingrese al menos dos caracteres para consultar el registro.
            </p>
          ) : null}
        </div>
      </Panel>
    </>
  );
}
