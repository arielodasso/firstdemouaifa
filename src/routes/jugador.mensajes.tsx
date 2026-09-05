import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { mensajes } from "@/lib/mock-data";

export const Route = createFileRoute("/jugador/mensajes")({
  head: () => ({
    meta: [
      { title: "Mensajes — UAIFA CAMP" },
      { name: "description", content: "Clubes y agentes interesados en contactar al jugador." },
      { property: "og:title", content: "Mensajes — UAIFA CAMP" },
      { property: "og:description", content: "Consultas recibidas a través de la plataforma." },
    ],
  }),
  component: Mensajes,
});

function Mensajes() {
  return (
    <>
      <PageHeader
        title="Mensajes"
        description="Consultas de clubes y agentes registrados. Todo contacto queda notificado a su representante y asentado en el registro de la plataforma."
      />

      <Panel>
        <ul className="divide-y divide-border">
          {mensajes.map((m) => (
            <li key={m.asunto} className="flex flex-wrap items-start justify-between gap-3 py-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{m.de}</p>
                  <Tag>{m.tipo}</Tag>
                </div>
                <p className="mt-1 text-sm text-foreground">{m.asunto}</p>
                <p className="mt-1 text-xs text-muted-foreground">Recibido el {m.fecha}</p>
              </div>
              <div className="flex items-center gap-2">
                <Tag tone={m.estado === "Sin responder" ? "warn" : m.estado === "Autorizado" ? "ok" : "neutral"}>
                  {m.estado}
                </Tag>
                <button className="rounded-sm border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-muted">
                  Abrir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
