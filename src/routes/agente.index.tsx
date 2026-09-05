import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { PageHeader, Panel, Stat, Tag, VerifiedBadge } from "@/components/shell";
import { agente, carteraJugadores, negociaciones } from "@/lib/mock-data";

export const Route = createFileRoute("/agente/")({
  head: () => ({
    meta: [
      { title: "Panel del agente — UAIFA CAMP" },
      { name: "description", content: "Resumen de cartera, negociaciones activas y alertas de licencia." },
      { property: "og:title", content: "Panel del agente — UAIFA CAMP" },
      { property: "og:description", content: "Cartera representada, negociaciones y vencimientos." },
    ],
  }),
  component: Panel1,
});

function Panel1() {
  return (
    <>
      <PageHeader
        title="Panel general"
        description={`Bienvenido, ${agente.nombre}. Estado consolidado de su actividad como intermediario registrado.`}
        action={<VerifiedBadge label="Agente FIFA verificado" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Jugadores representados" value={String(carteraJugadores.length)} hint="3 con contrato vigente +24 meses" />
        <Stat label="Negociaciones activas" value={String(negociaciones.length)} hint="2 en etapa de validación" />
        <Stat label="Cumplimiento de plazos" value={`${agente.cumplimientoPlazos}%`} hint="Últimas 24 operaciones" />
        <Stat label="Vigencia de licencia" value={agente.vigencia} hint="Renovación disponible desde 01/2027" />
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-md border border-warning/50 bg-warning/10 p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
        <div className="text-sm">
          <p className="font-semibold text-foreground">Alertas de vencimiento</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
            <li>Licencia FIFA vence el {agente.vigencia}. Documentación de renovación aún no presentada.</li>
            <li>Contrato de Iker Montenegro finaliza en 12/2025 sin renovación registrada.</li>
            <li>Cuota de minoridad de Santiago Ovalle en trámite ante UAIFA.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Cartera representada" subtitle="Estado por jugador">
          <ul className="divide-y divide-border">
            {carteraJugadores.map((j) => (
              <li key={j.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{j.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {j.posicion} · {j.club}
                  </p>
                </div>
                <Tag tone={j.estado === "Vencimiento próximo" ? "warn" : j.estado === "En negociación" ? "ok" : "neutral"}>
                  {j.estado}
                </Tag>
              </li>
            ))}
          </ul>
          <Link to="/agente/cartera" className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-navy">
            Ver cartera completa →
          </Link>
        </Panel>

        <Panel title="Negociaciones activas" subtitle="Actualizaciones recientes del mercado de pases">
          <ul className="divide-y divide-border">
            {negociaciones.map((n) => (
              <li key={n.id} className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{n.jugador}</p>
                  <Tag>{n.etapa}</Tag>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {n.contraparte} · {n.monto} · Actualizado {n.actualizado}
                </p>
              </li>
            ))}
          </ul>
          <Link to="/agente/mercado" className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-navy">
            Abrir tablero de negociaciones →
          </Link>
        </Panel>
      </div>
    </>
  );
}
