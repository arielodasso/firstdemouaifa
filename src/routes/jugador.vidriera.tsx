import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { PageHeader, Panel, Tag } from "@/components/shell";
import { jugador, rendimiento, carteraJugadores } from "@/lib/mock-data";

export const Route = createFileRoute("/jugador/vidriera")({
  head: () => ({
    meta: [
      { title: "Mi vidriera — UAIFA CAMP" },
      { name: "description", content: "Gestión de las secciones expuestas del perfil con controles de privacidad." },
      { property: "og:title", content: "Mi vidriera — UAIFA CAMP" },
      { property: "og:description", content: "Controle qué ven los clubes de su ficha." },
    ],
  }),
  component: MiVidriera,
});

const secciones = [
  { key: "contractual", label: "Datos contractuales", detalle: "Salario, cláusula y vigencia (solo partes habilitadas)" },
  { key: "rendimiento", label: "Estadísticas de rendimiento", detalle: "Partidos, goles, asistencias y minutos por temporada" },
  { key: "multimedia", label: "Material audiovisual", detalle: "Video destacado y compilados de juego" },
  { key: "contacto", label: "Canal de contacto directo", detalle: "Permite que un club escriba sin intermediación previa" },
];

function MiVidriera() {
  const v = carteraJugadores[0]!;
  const [on, setOn] = useState<Record<string, boolean>>({
    contractual: false,
    rendimiento: true,
    multimedia: true,
    contacto: false,
  });

  return (
    <>
      <PageHeader
        title="Mi vidriera"
        description="Defina qué secciones de su ficha son visibles para los clubes registrados. Los datos contractuales permanecen bajo control conjunto con su representante."
        action={<Tag tone="ok">{Object.values(on).filter(Boolean).length} de {secciones.length} secciones visibles</Tag>}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <Panel title="Privacidad por sección">
          <ul className="divide-y divide-border">
            {secciones.map((s) => (
              <li key={s.key} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.detalle}</p>
                </div>
                <button
                  onClick={() => setOn((p) => ({ ...p, [s.key]: !p[s.key] }))}
                  aria-pressed={on[s.key]}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on[s.key] ? "bg-navy" : "bg-muted"}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow transition-all ${on[s.key] ? "left-4.5" : "left-0.5"}`}
                  />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Cada cambio de visibilidad se asienta en el registro de evidencia de UAIFA con fecha y firma.
          </p>
        </Panel>

        <Panel title="Vista previa del club" subtitle="Así se ve su ficha con la configuración actual">
          <div className="rounded-sm border border-border p-4">
            <h3 className="text-base text-foreground">{jugador.nombre}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {jugador.posicion} · {jugador.edad} años · {jugador.club}
            </p>

            {on["multimedia"] ? (
              <div className="surface-institutional mt-4 flex aspect-video items-center justify-center rounded-sm">
                <div className="text-center">
                  <PlayCircle className="mx-auto h-9 w-9 text-gold" />
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-navy-foreground/70">
                    Video destacado
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-sm border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                Material audiovisual oculto
              </p>
            )}

            {on["rendimiento"] ? (
              <ul className="mt-4 space-y-1.5 text-sm">
                {rendimiento.map((r) => (
                  <li key={r.temporada} className="flex justify-between">
                    <span className="text-foreground">{r.temporada}</span>
                    <span className="text-muted-foreground">
                      {r.partidos} PJ · {r.goles} G · {r.asistencias} A
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-xs text-muted-foreground">Estadísticas de rendimiento ocultas</p>
            )}

            <p className="mt-4 text-sm text-foreground">
              Valuación estimada: USD {v.valuacionMin}M — {v.valuacionMax}M
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {on["contractual"]
                ? "Datos contractuales visibles para partes habilitadas."
                : "Datos contractuales reservados."}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {on["contacto"]
                ? "Contacto directo habilitado."
                : "Contacto únicamente a través del representante."}
            </p>
          </div>
        </Panel>
      </div>
    </>
  );
}
