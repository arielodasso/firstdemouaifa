import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { etapasMercado, negociaciones } from "@/lib/mock-data";

export const Route = createFileRoute("/agente/mercado")({
  head: () => ({
    meta: [
      { title: "Mercado de pases — UAIFA CAMP" },
      { name: "description", content: "Tablero de negociaciones activas por jugador, de la oferta al cierre." },
      { property: "og:title", content: "Mercado de pases — UAIFA CAMP" },
      { property: "og:description", content: "Seguimiento de negociaciones por etapa." },
    ],
  }),
  component: Mercado,
});

function Mercado() {
  return (
    <>
      <PageHeader
        title="Mercado de pases"
        description="Negociaciones activas de su cartera. El avance de etapa requiere validación de la contraparte y queda asentado en el registro de evidencia."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {etapasMercado.map((etapa) => {
          const items = negociaciones.filter((n) => n.etapa === etapa);
          return (
            <div key={etapa} className="rounded-md border border-border bg-muted/50 p-3">
              <header className="mb-3 flex items-center justify-between">
                <h2 className="text-[11px] tracking-[0.1em] text-muted-foreground">{etapa}</h2>
                <span className="rounded-sm bg-navy px-1.5 py-0.5 text-[10px] font-semibold text-navy-foreground">
                  {items.length}
                </span>
              </header>
              <div className="space-y-3">
                {items.map((n) => (
                  <article key={n.id} className="rounded-sm border border-border bg-card p-3 shadow-sm">
                    <p className="text-sm font-semibold text-foreground">{n.jugador}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{n.contraparte}</p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold text-navy">
                      {n.monto}
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground">Actualizado {n.actualizado}</p>
                  </article>
                ))}
                {items.length === 0 ? (
                  <p className="rounded-sm border border-dashed border-border px-3 py-6 text-center text-[11px] text-muted-foreground">
                    Sin negociaciones en esta etapa
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
