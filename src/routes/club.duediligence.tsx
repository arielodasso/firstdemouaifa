import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag, VerifiedBadge } from "@/components/shell";
import { LinkClub, LinkJugador } from "@/components/ficha";
import { getClub, listaJugadores, getJugador } from "@/lib/futbol-data";
import { datosVerificados } from "@/lib/mock-data";

export const Route = createFileRoute("/club/duediligence")({
  head: () => ({
    meta: [
      { title: "Due diligence del jugador — UAIFA CAMP" },
      { name: "description", content: "Seleccioná los jugadores a analizar y compará valuación dual, contrato y trayectoria verificada." },
      { property: "og:title", content: "Due diligence del jugador — UAIFA CAMP" },
      { property: "og:description", content: "Eventos validados en lugar de reconstrucción de prensa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DueDiligence,
});

const base = "/club";

function DueDiligence() {
  const [seleccion, setSeleccion] = useState<string[]>(["j-01", "j-02"]);
  const [busca, setBusca] = useState("");
  const [tab, setTab] = useState<"estimado" | "verificado">("estimado");
  const [foco, setFoco] = useState("j-01");

  const disponibles = listaJugadores.filter((j) =>
    `${j.nombre} ${j.posicion} ${j.pais}`.toLowerCase().includes(busca.toLowerCase()),
  );
  const elegidos = seleccion.map((id) => getJugador(id)).filter(Boolean);
  const jugadorFoco = getJugador(seleccion.includes(foco) ? foco : (seleccion[0] ?? ""));
  const dv = jugadorFoco ? datosVerificados[jugadorFoco.id] : undefined;

  function alternar(id: string) {
    setSeleccion((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <>
      <PageHeader
        title="Due diligence"
        description="Elegí los jugadores de interés para analizarlos y compararlos antes del fichaje. La información surge del registro de UAIFA y de los datos habilitados por el intermediario representante."
        action={<VerifiedBadge label="Registro UAIFA" />}
      />

      <Panel title="Selección de jugadores a analizar" subtitle={`${seleccion.length} jugador(es) en el análisis`}>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nombre, posición o país"
          className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-navy"
        />
        <div className="mt-3 flex max-h-56 flex-wrap gap-2 overflow-y-auto">
          {disponibles.map((j) => {
            const activo = seleccion.includes(j.id);
            return (
              <button
                key={j.id}
                onClick={() => alternar(j.id)}
                className={`rounded-sm border px-3 py-1.5 text-xs transition-colors ${
                  activo
                    ? "border-navy bg-navy text-navy-foreground"
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                {j.nombre}
                <span className={activo ? "ml-1.5 opacity-70" : "ml-1.5 text-muted-foreground"}>
                  {j.posicionCorta} · {j.edad}
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      {elegidos.length === 0 ? (
        <div className="mt-4">
          <Panel>
            <p className="text-sm text-muted-foreground">Seleccioná al menos un jugador para iniciar el análisis.</p>
          </Panel>
        </div>
      ) : (
        <>
          <div className="mt-4">
            <Panel title="Comparativa" subtitle="Datos públicos del registro ilustrativo">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      <th className="pb-2 pr-3 font-semibold">Jugador</th>
                      <th className="pb-2 pr-3 font-semibold">Posición</th>
                      <th className="pb-2 pr-3 font-semibold">Edad</th>
                      <th className="pb-2 pr-3 font-semibold">Club</th>
                      <th className="pb-2 pr-3 font-semibold">Contrato</th>
                      <th className="pb-2 pr-3 font-semibold">Valuación estimada</th>
                      <th className="pb-2 pr-3 font-semibold">Confianza</th>
                      <th className="pb-2 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {elegidos.map((j) => {
                      const c = getClub(j!.clubId);
                      return (
                        <tr key={j!.id} className="hover:bg-muted/60">
                          <td className="py-2.5 pr-3">
                            <LinkJugador base={base} id={j!.id} className="font-medium text-navy underline-offset-2 hover:underline">
                              {j!.nombre}
                            </LinkJugador>
                          </td>
                          <td className="py-2.5 pr-3 text-muted-foreground">{j!.posicion}</td>
                          <td className="py-2.5 pr-3 text-muted-foreground">{j!.edad}</td>
                          <td className="py-2.5 pr-3">
                            {c ? (
                              <LinkClub base={base} clubId={c.id} className="text-navy underline-offset-2 hover:underline">
                                {c.nombre}
                              </LinkClub>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="py-2.5 pr-3 text-muted-foreground">{j!.contratoHasta}</td>
                          <td className="py-2.5 pr-3 text-foreground">
                            USD {j!.valuacionMin}M — {j!.valuacionMax}M
                          </td>
                          <td className="py-2.5 pr-3 text-muted-foreground">{j!.confianza}%</td>
                          <td className="py-2.5">
                            {j!.verificado ? <Tag tone="ok">Verificado</Tag> : <Tag tone="warn">Pendiente</Tag>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          {jugadorFoco ? (
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Panel title="Valuación dual" subtitle={`Análisis detallado de ${jugadorFoco.nombre}`}>
                <div className="mb-3 flex flex-wrap gap-2">
                  {elegidos.map((j) => (
                    <button
                      key={j!.id}
                      onClick={() => setFoco(j!.id)}
                      className={`rounded-sm border px-2.5 py-1 text-[11px] ${
                        jugadorFoco.id === j!.id ? "border-navy text-navy" : "border-border text-muted-foreground"
                      }`}
                    >
                      {j!.nombre}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1 border-b border-border">
                  {(["estimado", "verificado"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`-mb-px border-b-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                        tab === t ? "border-gold text-foreground" : "border-transparent text-muted-foreground"
                      }`}
                    >
                      {t === "estimado" ? "Estimado (público)" : "Verificado (auditado)"}
                    </button>
                  ))}
                </div>

                {tab === "estimado" ? (
                  <div className="pt-4">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
                      USD {jugadorFoco.valuacionMin}M — {jugadorFoco.valuacionMax}M
                    </p>
                    <div className="mt-3 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-navy" style={{ width: `${jugadorFoco.confianza}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Confianza del modelo: {jugadorFoco.confianza}%.
                    </p>
                  </div>
                ) : dv ? (
                  <div className="pt-4">
                    <Tag tone="ok">Acceso habilitado como club comprador</Tag>
                    <dl className="mt-3 divide-y divide-border text-sm">
                      <div className="flex justify-between py-2">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Cláusula</dt>
                        <dd className="font-medium text-foreground">{dv.clausula}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Comisión</dt>
                        <dd className="font-medium text-foreground">{dv.comision}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Salario</dt>
                        <dd className="text-xs text-muted-foreground">Restringido por el representante</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Vigencia</dt>
                        <dd className="font-medium text-foreground">{dv.vigencia}</dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <div className="pt-4">
                    <Tag tone="warn">Sin acceso habilitado</Tag>
                    <p className="mt-3 text-sm text-muted-foreground">
                      El intermediario representante todavía no habilitó los datos contractuales verificados de este
                      jugador para su club.
                    </p>
                  </div>
                )}
              </Panel>

              <Panel title="Historial de carrera verificado" subtitle="Eventos validados por UAIFA">
                <ol className="relative space-y-5 border-l border-border pl-5">
                  {jugadorFoco.trayectoria.map((h, i) => {
                    const c = getClub(h.clubId);
                    return (
                      <li key={`${h.periodo}-${i}`} className="relative">
                        <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-navy" />
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          {h.periodo} · {h.tipo}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {c ? (
                            <LinkClub base={base} clubId={c.id} className="text-navy underline-offset-2 hover:underline">
                              {c.nombre}
                            </LinkClub>
                          ) : (
                            <span className="text-foreground">Club no registrado</span>
                          )}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{h.detalle}</p>
                      </li>
                    );
                  })}
                </ol>
              </Panel>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
