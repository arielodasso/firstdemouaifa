import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { semillero } from "@/lib/mock-data";

export const Route = createFileRoute("/club/semillero")({
  head: () => ({
    meta: [
      { title: "Semillero +16 — UAIFA CAMP" },
      { name: "description", content: "Base de jugadores juveniles con filtros por posición, edad y país para scouting." },
      { property: "og:title", content: "Semillero +16 — UAIFA CAMP" },
      { property: "og:description", content: "Scouting de juveniles verificados en América." },
    ],
  }),
  component: SemilleroClub,
});

const posiciones = ["Todas", ...new Set(semillero.map((s) => s.posicion))];
const paises = ["Todos", ...new Set(semillero.map((s) => s.pais))];

function SemilleroClub() {
  const [pos, setPos] = useState("Todas");
  const [pais, setPais] = useState("Todos");
  const [edadMax, setEdadMax] = useState(18);

  const lista = semillero.filter(
    (s) => (pos === "Todas" || s.posicion === pos) && (pais === "Todos" || s.pais === pais) && s.edad <= edadMax,
  );

  return (
    <>
      <PageHeader
        title="Semillero +16"
        description="Jugadores juveniles registrados en UAIFA, disponibles para observación sin requerir estructura de scouting propia."
      />

      <Panel className="mb-4">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-xs text-muted-foreground">
            Posición
            <select value={pos} onChange={(e) => setPos(e.target.value)} className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-navy">
              {posiciones.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-muted-foreground">
            País
            <select value={pais} onChange={(e) => setPais(e.target.value)} className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-navy">
              {paises.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-muted-foreground">
            Edad máxima: {edadMax} años
            <input type="range" min={16} max={18} value={edadMax} onChange={(e) => setEdadMax(Number(e.target.value))} className="mt-3 w-full accent-[var(--navy)]" />
          </label>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lista.map((s) => (
          <Panel key={s.id}>
            <h3 className="text-base text-foreground">{s.nombre}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {s.posicion} · {s.edad} años · {s.pais}
            </p>
            <p className="mt-3 text-sm text-foreground">{s.club}</p>
            <p className="mt-1 text-xs text-muted-foreground">Representante: {s.agente}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Tag tone={s.cuotaMinoridad === "Cumplida" ? "ok" : s.cuotaMinoridad === "Observada" ? "risk" : "warn"}>
                Minoridad: {s.cuotaMinoridad}
              </Tag>
              <Tag tone={s.derechosFormacion === "Registrados" ? "ok" : "warn"}>
                Formación: {s.derechosFormacion}
              </Tag>
            </div>
            <button className="mt-4 w-full rounded-sm border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-muted">
              Solicitar acceso a vidriera
            </button>
          </Panel>
        ))}
      </div>
    </>
  );
}
