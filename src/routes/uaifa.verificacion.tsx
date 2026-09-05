import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { colaVerificacion } from "@/lib/mock-data";

export const Route = createFileRoute("/uaifa/verificacion")({
  head: () => ({
    meta: [
      { title: "Gestión de verificación — UAIFA CAMP" },
      { name: "description", content: "Cola de agentes, clubes y jugadores pendientes de aprobación del sello UAIFA Verified." },
      { property: "og:title", content: "Gestión de verificación — UAIFA CAMP" },
      { property: "og:description", content: "Aprobación y rechazo de solicitudes de verificación." },
    ],
  }),
  component: GestionVerificacion,
});

function GestionVerificacion() {
  const [estado, setEstado] = useState<Record<string, "aprobado" | "rechazado">>({});

  return (
    <>
      <PageHeader
        title="Gestión de verificación"
        description="Resolución de solicitudes del sello UAIFA Verified. La aprobación habilita la exhibición del perfil ante clubes y agentes de la plataforma."
        action={<Tag>{colaVerificacion.length - Object.keys(estado).length} pendientes</Tag>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {colaVerificacion.map((c) => {
          const res = estado[c.id];
          return (
            <Panel key={c.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base text-foreground">{c.solicitante}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.tipo} · {c.pais} · Ingresó {c.ingreso}
                  </p>
                </div>
                {res ? (
                  <Tag tone={res === "aprobado" ? "ok" : "risk"}>
                    {res === "aprobado" ? "Aprobado" : "Rechazado"}
                  </Tag>
                ) : (
                  <Tag tone="warn">Pendiente</Tag>
                )}
              </div>

              <p className="mt-3 text-sm text-foreground">Documentación presentada</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.documentacion}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEstado((s) => ({ ...s, [c.id]: "aprobado" }))}
                  className="rounded-sm bg-navy px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-foreground transition-opacity hover:opacity-90"
                >
                  Aprobar sello
                </button>
                <button
                  onClick={() => setEstado((s) => ({ ...s, [c.id]: "rechazado" }))}
                  className="rounded-sm border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-muted"
                >
                  Rechazar
                </button>
              </div>
            </Panel>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Las resoluciones de esta demostración no modifican registros reales. En producción, cada
        aprobación o rechazo genera un asiento firmado en el registro de evidencia.
      </p>
    </>
  );
}
