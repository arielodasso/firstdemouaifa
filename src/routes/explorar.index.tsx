import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/shell";
import { ClubInline, JugadorInline } from "@/components/ficha";
import { ligas, topValores, valorPlantel } from "@/lib/futbol-data";

export const Route = createFileRoute("/explorar/")({
  head: () => ({
    meta: [
      { title: "Competencias y planteles — UAIFA CAMP" },
      {
        name: "description",
        content:
          "Explorá competencias, clubes y jugadores registrados: planteles completos, valores de mercado y fichas individuales.",
      },
      { property: "og:title", content: "Competencias y planteles — UAIFA CAMP" },
      {
        property: "og:description",
        content: "Navegación abierta por ligas, clubes y fichas de jugadores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explorar,
});

function Explorar() {
  return (
    <>
      <PageHeader
        title="Competencias"
        description="Recorrido abierto por las ligas registradas, sus clubes y los planteles con ficha individual de cada jugador."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {ligas.map((l) => (
            <Panel key={l.liga} title={l.liga}>
              <p className="text-xs text-muted-foreground">{l.pais}</p>
              <ul className="mt-3 divide-y divide-border">
                {l.clubes.map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <ClubInline clubId={c.id} nombre={c.nombre} base="/explorar" size={26} />
                    <span className="shrink-0 text-xs text-muted-foreground">
                      USD {valorPlantel(c.id).toFixed(1)}M
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>

        <Panel title="Mayores valores de mercado">
          <ol className="divide-y divide-border">
            {topValores.slice(0, 10).map((j, i) => (
              <li key={j.id} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="w-4 text-xs text-muted-foreground">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <JugadorInline id={j.id} nombre={j.nombre} base="/explorar" size={30} />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {j.posicion} · {j.edad} años
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-foreground">
                  USD {j.valorM}M
                </span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </>
  );
}
