import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { ledger } from "@/lib/mock-data";

export const Route = createFileRoute("/agente/auditoria")({
  head: () => ({
    meta: [
      { title: "Auditoría del agente — UAIFA CAMP" },
      { name: "description", content: "Acuerdos de representación firmados y evidencia de operaciones con firma simulada." },
      { property: "og:title", content: "Auditoría del agente — UAIFA CAMP" },
      { property: "og:description", content: "Registro inmutable de acciones del intermediario." },
    ],
  }),
  component: Auditoria,
});

const acuerdos = [
  { jugador: "Tomás Ferreyra", desde: "01/2025", hasta: "01/2027", estado: "Vigente" },
  { jugador: "Ezequiel Rondán", desde: "06/2024", hasta: "06/2026", estado: "Vigente" },
  { jugador: "Bruno Alcaraz", desde: "07/2025", hasta: "07/2027", estado: "Vigente" },
  { jugador: "Iker Montenegro", desde: "02/2023", hasta: "02/2026", estado: "Próximo a vencer" },
];

function Auditoria() {
  return (
    <>
      <PageHeader
        title="Auditoría"
        description="Registro de acuerdos de representación y evidencia de operaciones. Cada asiento incorpora una firma criptográfica y no admite modificación posterior."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Panel title="Acuerdos de representación">
          <ul className="divide-y divide-border">
            {acuerdos.map((a) => (
              <li key={a.jugador} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.jugador}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.desde} — {a.hasta}
                  </p>
                </div>
                <Tag tone={a.estado === "Vigente" ? "ok" : "warn"}>{a.estado}</Tag>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Evidencia de operaciones" subtitle="Ledger propio del intermediario">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  <th className="pb-2 pr-3 font-semibold">Fecha</th>
                  <th className="pb-2 pr-3 font-semibold">Acción</th>
                  <th className="pb-2 font-semibold">Firma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ledger.map((l) => (
                  <tr key={l.hash}>
                    <td className="py-2.5 pr-3 whitespace-nowrap text-xs text-muted-foreground">{l.fecha}</td>
                    <td className="py-2.5 pr-3 text-foreground">
                      {l.accion}
                      <span className="block text-xs text-muted-foreground">{l.parte}</span>
                    </td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">{l.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}
