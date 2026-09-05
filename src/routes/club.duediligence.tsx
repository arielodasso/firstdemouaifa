import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag, VerifiedBadge } from "@/components/shell";
import { carteraJugadores, datosVerificados, historialCarrera } from "@/lib/mock-data";

export const Route = createFileRoute("/club/duediligence")({
  head: () => ({
    meta: [
      { title: "Due diligence del jugador — UAIFA CAMP" },
      { name: "description", content: "Valuación dual e historial de carrera verificado para el análisis previo al fichaje." },
      { property: "og:title", content: "Due diligence del jugador — UAIFA CAMP" },
      { property: "og:description", content: "Eventos validados en lugar de reconstrucción de prensa." },
    ],
  }),
  component: DueDiligence,
});

function DueDiligence() {
  const jugador = carteraJugadores[0]!;
  const [tab, setTab] = useState<"estimado" | "verificado">("estimado");
  const dv = datosVerificados[jugador.id]!;

  return (
    <>
      <PageHeader
        title="Due diligence"
        description={`Análisis previo al fichaje de ${jugador.nombre}. La información surge del registro de UAIFA y de los datos habilitados por el intermediario representante.`}
        action={<VerifiedBadge label="Jugador verificado" />}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Valuación dual">
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
                USD {jugador.valuacionMin}M — {jugador.valuacionMax}M
              </p>
              <div className="mt-3 h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-navy" style={{ width: `${jugador.confianza}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Confianza del modelo: {jugador.confianza}%.
              </p>
            </div>
          ) : (
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
          )}
        </Panel>

        <Panel title="Historial de carrera verificado" subtitle="Eventos validados por UAIFA">
          <ol className="relative space-y-5 border-l border-border pl-5">
            {historialCarrera.map((h) => (
              <li key={h.fecha} className="relative">
                <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-navy" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {h.fecha} · {h.tipo}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{h.evento}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{h.detalle}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </>
  );
}
