import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { FichaJugador, RetratoJugador, EscudoClub } from "@/components/ficha";
import { listaJugadores, getClub, getJugador } from "@/lib/futbol-data";

export const Route = createFileRoute("/club/vidriera")({
  head: () => ({
    meta: [
      { title: "Vidriera del jugador — UAIFA CAMP" },
      { name: "description", content: "Ficha completa del jugador: rendimiento, valuación y agente representante, con acceso autorizado." },
      { property: "og:title", content: "Vidriera del jugador — UAIFA CAMP" },
      { property: "og:description", content: "Ficha habilitada para clubes autorizados." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vidriera,
});

function Vidriera() {
  const [sel, setSel] = useState(listaJugadores[0]!.id);
  const j = getJugador(sel) ?? listaJugadores[0]!;

  return (
    <>
      <PageHeader
        title="Vidriera del jugador"
        description="Acceso autorizado por el agente representante. La vidriera exhibe únicamente las secciones habilitadas por el jugador."
        action={<Tag tone="ok">Acceso autorizado</Tag>}
      />

      <Panel className="mb-4" title="Seleccione un jugador" subtitle="Listado de fichas habilitadas para su club">
        <div className="flex flex-wrap gap-2">
          {listaJugadores.slice(0, 12).map((p) => {
            const c = getClub(p.clubId);
            return (
              <button
                key={p.id}
                onClick={() => setSel(p.id)}
                className={`flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-xs transition-colors ${
                  sel === p.id ? "border-navy bg-muted" : "border-border hover:border-navy/40"
                }`}
              >
                <RetratoJugador id={p.id} size={24} />
                <span className="font-medium text-foreground">{p.nombre}</span>
                {c ? <EscudoClub clubId={c.id} size={16} /> : null}
              </button>
            );
          })}
        </div>
      </Panel>

      <FichaJugador jugador={j} base="/club" />
    </>
  );
}
