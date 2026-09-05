import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { etapasMercado, negociaciones } from "@/lib/mock-data";

export const Route = createFileRoute("/club/mercado")({
  head: () => ({
    meta: [
      { title: "Mercado de pases — UAIFA CAMP" },
      { name: "description", content: "Publicación de necesidades de fichaje y tablero de negociaciones del club." },
      { property: "og:title", content: "Mercado de pases — UAIFA CAMP" },
      { property: "og:description", content: "Publique una necesidad y siga sus negociaciones abiertas." },
    ],
  }),
  component: MercadoClub,
});

function MercadoClub() {
  const [enviado, setEnviado] = useState(false);

  return (
    <>
      <PageHeader
        title="Mercado de pases"
        description="Publique el perfil que el club necesita incorporar. Solo agentes con verificación activa pueden responder con una propuesta."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <Panel title="Publicar necesidad de fichaje">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEnviado(true);
            }}
            className="space-y-3"
          >
            <label className="block text-xs text-muted-foreground">
              Posición requerida
              <input className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm outline-none focus:border-navy" defaultValue="Mediocampista central" />
            </label>
            <label className="block text-xs text-muted-foreground">
              Rango etario
              <input className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm outline-none focus:border-navy" defaultValue="22 — 27 años" />
            </label>
            <label className="block text-xs text-muted-foreground">
              Presupuesto estimado
              <input className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm outline-none focus:border-navy" defaultValue="USD 1.000.000 — 1.600.000" />
            </label>
            <label className="block text-xs text-muted-foreground">
              Requisitos adicionales
              <textarea rows={3} className="mt-1 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm outline-none focus:border-navy" defaultValue="Experiencia en torneo continental. Disponibilidad inmediata." />
            </label>
            <button className="w-full rounded-sm bg-navy px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-foreground">
              Publicar necesidad
            </button>
            {enviado ? (
              <p className="rounded-sm border border-success/40 bg-success/10 p-2 text-xs text-success">
                Necesidad publicada en la demostración. Notificada a 38 agentes verificados de la región.
              </p>
            ) : null}
          </form>
        </Panel>

        <div>
          <h2 className="mb-3 text-sm text-foreground">Negociaciones abiertas del club</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {etapasMercado.map((etapa) => {
              const items = negociaciones.filter((n) => n.etapa === etapa);
              return (
                <div key={etapa} className="rounded-md border border-border bg-muted/50 p-3">
                  <header className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{etapa}</span>
                    <Tag>{items.length}</Tag>
                  </header>
                  <div className="space-y-2">
                    {items.map((n) => (
                      <article key={n.id} className="rounded-sm border border-border bg-card p-3">
                        <p className="text-sm font-semibold text-foreground">{n.jugador}</p>
                        <p className="text-xs text-muted-foreground">{n.contraparte}</p>
                        <p className="mt-1 text-xs font-semibold text-navy">{n.monto}</p>
                      </article>
                    ))}
                    {items.length === 0 ? (
                      <p className="py-4 text-center text-[11px] text-muted-foreground">Sin movimientos</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
