import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { PageHeader, Panel, Tag, VerifiedBadge } from "@/components/shell";
import { carteraJugadores, datosVerificados } from "@/lib/mock-data";

export const Route = createFileRoute("/agente/valuacion")({
  head: () => ({
    meta: [
      { title: "Valuación dual — UAIFA CAMP" },
      { name: "description", content: "Valuación estimada pública y valuación verificada auditada, con visibilidad granular por parte." },
      { property: "og:title", content: "Valuación dual — UAIFA CAMP" },
      { property: "og:description", content: "Gestión de datos contractuales y permisos de visibilidad." },
    ],
  }),
  component: Valuacion,
});

const partes = [
  { key: "vendedor", label: "Club vendedor", detalle: "Accede a salario, cláusula y vigencia" },
  { key: "comprador", label: "Club comprador", detalle: "Accede a cláusula y comisión" },
  { key: "agentes", label: "Otros agentes", detalle: "Accede únicamente al rango estimado" },
];

function Valuacion() {
  const [sel, setSel] = useState(carteraJugadores[0]!.id);
  const [tab, setTab] = useState<"estimado" | "verificado">("estimado");
  const [vis, setVis] = useState<Record<string, boolean>>({
    vendedor: true,
    comprador: false,
    agentes: false,
  });

  const jugador = carteraJugadores.find((j) => j.id === sel)!;
  const verificado = datosVerificados[sel]!;

  return (
    <>
      <PageHeader
        title="Valuación dual"
        description="La valuación estimada es pública y se calcula por modelo. La valuación verificada contiene datos contractuales cargados por el agente y solo se comparte con las partes habilitadas."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {carteraJugadores.map((j) => (
          <button
            key={j.id}
            onClick={() => setSel(j.id)}
            className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors ${
              sel === j.id
                ? "border-navy bg-navy text-navy-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {j.nombre}
          </button>
        ))}
      </div>

      <div className="flex gap-1 border-b border-border">
        {(["estimado", "verificado"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
              tab === t ? "border-gold text-foreground" : "border-transparent text-muted-foreground"
            }`}
          >
            {t === "estimado" ? "Estimado (público)" : "Verificado (auditado)"}
          </button>
        ))}
      </div>

      {tab === "estimado" ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <Panel title="Rango estimado" className="lg:col-span-2">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-navy">
              USD {jugador.valuacionMin}M — {jugador.valuacionMax}M
            </p>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-navy" style={{ width: `${jugador.confianza}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Confianza del modelo: {jugador.confianza}%. Basada en minutos disputados, edad,
              posición, vigencia contractual y comparables del mercado regional.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Este rango es visible para cualquier club registrado en UAIFA CAMP.
            </p>
          </Panel>
          <Panel title="Variables del modelo">
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex justify-between"><span>Edad</span><span className="text-muted-foreground">{jugador.edad} años</span></li>
              <li className="flex justify-between"><span>Posición</span><span className="text-muted-foreground">{jugador.posicion}</span></li>
              <li className="flex justify-between"><span>Contrato</span><span className="text-muted-foreground">hasta {jugador.contratoHasta}</span></li>
              <li className="flex justify-between"><span>Liga</span><span className="text-muted-foreground">{jugador.pais}</span></li>
            </ul>
          </Panel>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Panel
            title="Datos contractuales verificados"
            subtitle="Cargados por el agente y auditados por UAIFA"
          >
            <div className="mb-3">
              <VerifiedBadge label="Auditado por UAIFA" />
            </div>
            <dl className="divide-y divide-border">
              {[
                ["Salario", verificado.salario],
                ["Cláusula de rescisión", verificado.clausula],
                ["Comisión del intermediario", verificado.comision],
                ["Vigencia del contrato", verificado.vigencia],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 py-2.5">
                  <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                  <dd className="text-sm font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <button className="mt-4 rounded-sm border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-muted">
              Actualizar datos contractuales
            </button>
          </Panel>

          <Panel title="Visibilidad por parte" subtitle="Control granular de quién accede a la valuación verificada">
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
                    className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                      vis[p.key] ? "bg-navy" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow transition-all ${
                        vis[p.key] ? "left-4.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-start gap-2 rounded-sm border border-border bg-muted p-3 text-xs text-muted-foreground">
              <Lock className="mt-0.5 h-3.5 w-3.5" />
              Cada cambio de visibilidad queda registrado en el ledger de evidencia de UAIFA con
              fecha, parte habilitada y firma.
            </div>
            <div className="mt-3">
              <Tag tone="ok">
                {Object.values(vis).filter(Boolean).length} de {partes.length} partes habilitadas
              </Tag>
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}
