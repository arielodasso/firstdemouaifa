import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { PageHeader, Panel, Tag, VerifiedBadge } from "@/components/shell";
import { jugador, rendimiento, carteraJugadores } from "@/lib/mock-data";

export const Route = createFileRoute("/club/vidriera")({
  head: () => ({
    meta: [
      { title: "Vidriera del jugador — UAIFA CAMP" },
      { name: "description", content: "Ficha completa del jugador: multimedia, rendimiento y representante, con acceso autorizado." },
      { property: "og:title", content: "Vidriera del jugador — UAIFA CAMP" },
      { property: "og:description", content: "Ficha habilitada para clubes autorizados." },
    ],
  }),
  component: Vidriera,
});

function Vidriera() {
  const v = carteraJugadores[0]!;

  return (
    <>
      <PageHeader
        title="Vidriera del jugador"
        description="Acceso autorizado por el intermediario representante. La vidriera exhibe únicamente las secciones habilitadas por el jugador."
        action={<Tag tone="ok">Acceso autorizado</Tag>}
      />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Panel>
          <div className="surface-institutional flex aspect-video items-center justify-center rounded-sm">
            <div className="text-center">
              <PlayCircle className="mx-auto h-12 w-12 text-gold" />
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-navy-foreground/80">
                Video destacado · Temporada 2025/26
              </p>
              <p className="mt-1 text-[11px] text-navy-foreground/50">
                Material simulado para la demostración
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg text-foreground">{jugador.nombre}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {jugador.posicion} · {jugador.edad} años · {jugador.pais}
              </p>
            </div>
            <VerifiedBadge label="Ficha verificada" />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[460px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  <th className="pb-2 pr-3 font-semibold">Temporada</th>
                  <th className="pb-2 pr-3 font-semibold">Partidos</th>
                  <th className="pb-2 pr-3 font-semibold">Goles</th>
                  <th className="pb-2 pr-3 font-semibold">Asistencias</th>
                  <th className="pb-2 font-semibold">Minutos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rendimiento.map((r) => (
                  <tr key={r.temporada}>
                    <td className="py-2.5 pr-3 font-medium text-foreground">{r.temporada}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{r.partidos}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{r.goles}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{r.asistencias}</td>
                    <td className="py-2.5 text-muted-foreground">{r.minutos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel title="Datos de ficha">
            <dl className="divide-y divide-border text-sm">
              {[
                ["Club actual", jugador.club],
                ["Pie hábil", jugador.pieHabil],
                ["Altura", jugador.altura],
                ["Contrato hasta", v.contratoHasta],
                ["Valuación estimada", `USD ${v.valuacionMin}M — ${v.valuacionMax}M`],
              ].map(([k, val]) => (
                <div key={k} className="flex justify-between gap-3 py-2.5">
                  <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium text-foreground">{val}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel title="Intermediario representante">
            <p className="text-sm font-semibold text-foreground">{jugador.agente}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Licencia FIFA Categoría A · FA-AR-2019-00417
            </p>
            <div className="mt-3">
              <VerifiedBadge label="Agente FIFA verificado" />
            </div>
            <button className="mt-4 w-full rounded-sm bg-navy px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-foreground">
              Iniciar contacto formal
            </button>
          </Panel>
        </div>
      </div>
    </>
  );
}
