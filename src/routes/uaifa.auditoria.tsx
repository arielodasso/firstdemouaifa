import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Info } from "lucide-react";
import { PageHeader, Panel } from "@/components/shell";
import { ledger } from "@/lib/mock-data";

export const Route = createFileRoute("/uaifa/auditoria")({
  head: () => ({
    meta: [
      { title: "Auditoría y evidencia — UAIFA CAMP" },
      { name: "description", content: "Ledger institucional con fecha, acción, parte involucrada y firma de cada asiento." },
      { property: "og:title", content: "Auditoría y evidencia — UAIFA CAMP" },
      { property: "og:description", content: "Custodia de evidencia verificada e inmutable." },
    ],
  }),
  component: AuditoriaUaifa,
});

function AuditoriaUaifa() {
  const [exportado, setExportado] = useState(false);

  return (
    <>
      <PageHeader
        title="Auditoría y evidencia"
        description="Registro institucional de asientos verificados. Cada operación incorpora firma criptográfica y no admite modificación posterior."
        action={
          <button
            onClick={() => setExportado(true)}
            className="inline-flex items-center gap-2 rounded-sm bg-navy px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" /> Exportar evidencia verificada
          </button>
        }
      />

      {exportado ? (
        <p className="mb-4 rounded-sm border border-success/40 bg-success/10 p-3 text-xs text-success">
          Paquete de evidencia generado en la demostración: {ledger.length} asientos con firma y sello temporal.
        </p>
      ) : null}

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <th className="pb-2 pr-3 font-semibold">Fecha</th>
                <th className="pb-2 pr-3 font-semibold">Acción</th>
                <th className="pb-2 pr-3 font-semibold">Parte involucrada</th>
                <th className="pb-2 font-semibold">Hash / firma</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ledger.map((l) => (
                <tr key={l.hash}>
                  <td className="py-2.5 pr-3 whitespace-nowrap text-xs text-muted-foreground">{l.fecha}</td>
                  <td className="py-2.5 pr-3 text-foreground">{l.accion}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{l.parte}</td>
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{l.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-4 flex items-start gap-3 rounded-md border border-border bg-muted p-4">
        <Info className="mt-0.5 h-4 w-4 text-navy" />
        <p className="text-sm text-foreground">
          UAIFA no arbitra disputas — solo custodia evidencia verificada e inmutable.
        </p>
      </div>
    </>
  );
}
