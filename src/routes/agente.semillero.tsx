import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { semillero, agente } from "@/lib/mock-data";

export const Route = createFileRoute("/agente/semillero")({
  head: () => ({
    meta: [
      { title: "Semillero +16 — UAIFA CAMP" },
      { name: "description", content: "Juveniles representados, estado de cuota de minoridad y derechos de formación." },
      { property: "og:title", content: "Semillero +16 — UAIFA CAMP" },
      { property: "og:description", content: "Gestión de jugadores juveniles bajo representación." },
    ],
  }),
  component: SemilleroAgente,
});

function tono(v: string) {
  if (v === "Cumplida" || v === "Registrados") return "ok" as const;
  if (v === "Observada") return "risk" as const;
  return "warn" as const;
}

function SemilleroAgente() {
  const propios = semillero.filter((s) => s.agente === agente.nombre);

  return (
    <>
      <PageHeader
        title="Semillero +16"
        description="Jugadores juveniles representados. La exhibición de menores de 18 años requiere cuota de minoridad cumplida y derechos de formación declarados ante UAIFA."
      />

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <th className="pb-2 pr-3 font-semibold">Jugador</th>
                <th className="pb-2 pr-3 font-semibold">Edad</th>
                <th className="pb-2 pr-3 font-semibold">Posición</th>
                <th className="pb-2 pr-3 font-semibold">Club formador</th>
                <th className="pb-2 pr-3 font-semibold">Cuota de minoridad</th>
                <th className="pb-2 font-semibold">Derechos de formación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {propios.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 pr-3 font-medium text-foreground">{s.nombre}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.edad}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.posicion}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.club}</td>
                  <td className="py-3 pr-3"><Tag tone={tono(s.cuotaMinoridad)}>{s.cuotaMinoridad}</Tag></td>
                  <td className="py-3"><Tag tone={tono(s.derechosFormacion)}>{s.derechosFormacion}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        UAIFA verifica la documentación de minoridad conforme al Reglamento sobre el Estatuto y la
        Transferencia de Jugadores. Un estado observado suspende la visibilidad del perfil ante clubes
        del exterior hasta su regularización.
      </p>
    </>
  );
}
