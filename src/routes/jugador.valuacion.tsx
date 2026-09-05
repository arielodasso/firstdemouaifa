import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { PageHeader, Panel, Tag, VerifiedBadge } from "@/components/shell";
import { carteraJugadores, datosVerificados } from "@/lib/mock-data";

export const Route = createFileRoute("/jugador/valuacion")({
  head: () => ({
    meta: [
      { title: "Mi valuación — UAIFA CAMP" },
      { name: "description", content: "Valuación estimada pública y control de acceso a la valuación verificada." },
      { property: "og:title", content: "Mi valuación — UAIFA CAMP" },
      { property: "og:description", content: "Rango estimado y permisos sobre los datos auditados." },
    ],
  }),
  component: MiValuacion,
});

const partes = [
  { key: "vendedor", label: "Mi club actual", detalle: "Ya accede por su condición de titular del contrato" },
  { key: "comprador", label: "Clubes interesados", detalle: "Acceden a cláusula y vigencia" },
  { key: "agentes", label: "Otros agentes", detalle: "Acceden únicamente al rango estimado" },
];

function MiValuacion() {
  const v = carteraJugadores[0]!;
  const dv = datosVerificados[v.id]!;
  const [vis, setVis] = useState<Record<string, boolean>>({
    vendedor: true,
    comprador: true,
    agentes: false,
  });

  return (
    <>
      <PageHeader
        title="Mi valuación"
        description="El rango estimado es público dentro de la plataforma. La valuación verificada solo se comparte con las partes que usted habilite junto a su representante."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Valuación estimada (pública)">
          <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-navy">
            USD {v.valuacionMin}M — {v.valuacionMax}M
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-navy" style={{ width: `${v.confianza}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Confianza del modelo: {v.confianza}%. Calculada sobre minutos disputados, edad, posición,
            vigencia contractual y comparables regionales.
          </p>
        </Panel>

        <Panel title="Valuación verificada (auditada)">
          <div className="mb-3">
            <VerifiedBadge label="Auditado por UAIFA" />
          </div>
          <dl className="divide-y divide-border text-sm">
            {[
              ["Salario", dv.salario],
              ["Cláusula de rescisión", dv.clausula],
              ["Comisión del intermediario", dv.comision],
              ["Vigencia", dv.vigencia],
            ].map(([k, val]) => (
              <div key={k} className="flex justify-between gap-3 py-2.5">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium text-foreground">{val}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>

      <Panel title="Quién puede ver mi valuación verificada" className="mt-4">
        <ul className="divide-y divide-border">
          {partes.map((p) => (
            <li key={p.key} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.detalle}</p>
              </div>
              <button
                onClick={() => setVis((s) => ({ ...s, [p.key]: !s[p.key] }))}
                aria-pressed={vis[p.key]}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${vis[p.key] ? "bg-navy" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow transition-all ${vis[p.key] ? "left-4.5" : "left-0.5"}`} />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-start gap-2 rounded-sm border border-border bg-muted p-3 text-xs text-muted-foreground">
          <Lock className="mt-0.5 h-3.5 w-3.5" />
          Toda habilitación o revocación queda asentada en el registro de evidencia con fecha y firma.
        </div>
        <div className="mt-3">
          <Tag tone="ok">{Object.values(vis).filter(Boolean).length} de {partes.length} partes habilitadas</Tag>
        </div>
      </Panel>
    </>
  );
}
