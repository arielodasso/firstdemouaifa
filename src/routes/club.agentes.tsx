import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag, VerifiedBadge } from "@/components/shell";
import { RetratoAgente, JugadorInline, ClubInline } from "@/components/ficha";
import { listaAgentes, jugadoresDeAgente, getClub } from "@/lib/futbol-data";

export const Route = createFileRoute("/club/agentes")({
  head: () => ({
    meta: [
      { title: "Directorio de agentes verificados — UAIFA CAMP" },
      { name: "description", content: "Búsqueda y filtros de agentes por región, licencia, especialización y volumen de operaciones." },
      { property: "og:title", content: "Directorio de agentes verificados — UAIFA CAMP" },
      { property: "og:description", content: "Encuentre agentes con verificación activa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Directorio,
});

const regiones = ["Todas", ...Array.from(new Set(listaAgentes.map((a) => a.region)))];
const licencias = ["Todas", "Categoría A", "Categoría B"];

function Directorio() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("Todas");
  const [lic, setLic] = useState("Todas");
  const [minOps, setMinOps] = useState(0);
  const [sel, setSel] = useState<string | null>(null);

  const lista = listaAgentes.filter(
    (a) =>
      (region === "Todas" || a.region === region) &&
      (lic === "Todas" || a.categoria === lic) &&
      a.operaciones >= minOps &&
      (a.nombre.toLowerCase().includes(q.toLowerCase()) ||
        a.especializacion.toLowerCase().includes(q.toLowerCase())),
  );
  const detalle = listaAgentes.find((a) => a.id === sel);
  const cartera = detalle ? jugadoresDeAgente(detalle.id) : [];

  return (
    <>
      <PageHeader
        title="Directorio de agentes verificados"
        description="Agentes con registro activo en UAIFA. El historial operacional exhibido proviene de operaciones validadas, no de fuentes periodísticas."
      />

      <Panel className="mb-4">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="text-xs text-muted-foreground">
            Búsqueda
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nombre o especialización"
              className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-navy"
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Región
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-navy"
            >
              {regiones.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-muted-foreground">
            Tipo de licencia
            <select
              value={lic}
              onChange={(e) => setLic(e.target.value)}
              className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-navy"
            >
              {licencias.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-muted-foreground">
            Volumen mínimo de operaciones: {minOps}
            <input
              type="range"
              min={0}
              max={70}
              step={5}
              value={minOps}
              onChange={(e) => setMinOps(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--navy)]"
            />
          </label>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          {lista.map((a) => (
            <button
              key={a.id}
              onClick={() => setSel(a.id)}
              className={`w-full rounded-md border bg-card p-4 text-left transition-colors ${
                sel === a.id ? "border-navy" : "border-border hover:border-navy/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <RetratoAgente id={a.id} size={44} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{a.nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.region} · {a.categoria}
                    </p>
                  </div>
                </div>
                {a.verificado ? <VerifiedBadge /> : <Tag tone="warn">Verificación pendiente</Tag>}
              </div>
              <p className="mt-2 text-sm text-foreground">{a.especializacion}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {a.operaciones} operaciones · {a.cumplimiento}% cumplimiento de plazos ·{" "}
                {jugadoresDeAgente(a.id).length} representados
              </p>
            </button>
          ))}
          {lista.length === 0 ? (
            <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No hay agentes que cumplan los criterios seleccionados.
            </p>
          ) : null}
        </div>

        <Panel title="Perfil del agente">
          {detalle ? (
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <RetratoAgente id={detalle.id} size={56} />
                  <h3 className="text-base text-foreground">{detalle.nombre}</h3>
                </div>
                {detalle.verificado ? <VerifiedBadge label="Agente FIFA verificado" /> : null}
              </div>
              <dl className="mt-4 divide-y divide-border text-sm">
                {[
                  ["Región", detalle.region],
                  ["Licencia", `${detalle.categoria} · ${detalle.licencia}`],
                  ["Especialización", detalle.especializacion],
                  ["Transferencias completadas", String(detalle.operaciones)],
                  ["Cumplimiento de plazos", `${detalle.cumplimiento}%`],
                  ["Registrado desde", String(detalle.desde)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 py-2.5">
                    <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Jugadores representados
              </p>
              <ul className="mt-2 divide-y divide-border">
                {cartera.map((j) => {
                  const c = getClub(j.clubId);
                  return (
                    <li key={j.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                      <JugadorInline id={j.id} nombre={j.nombre} base="/club" size={32} />
                      {c ? <ClubInline clubId={c.id} nombre={c.nombre} base="/club" size={16} /> : null}
                    </li>
                  );
                })}
              </ul>

              <Link
                to="/club/representante/$agenteId"
                params={{ agenteId: detalle.id }}
                className="mt-4 inline-block rounded-sm bg-navy px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-foreground"
              >
                Ver perfil completo del agente
              </Link>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Seleccione un agente del listado para consultar su ficha completa.
            </p>
          )}
        </Panel>
      </div>
    </>
  );
}
