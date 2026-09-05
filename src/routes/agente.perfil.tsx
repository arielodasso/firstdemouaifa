import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tag, VerifiedBadge } from "@/components/shell";
import { agente } from "@/lib/mock-data";

export const Route = createFileRoute("/agente/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil verificado — UAIFA CAMP" },
      { name: "description", content: "Licencia FIFA, historial operacional e insignia de verificación visible para los clubes." },
      { property: "og:title", content: "Mi perfil verificado — UAIFA CAMP" },
      { property: "og:description", content: "Lo que un club ve del agente en UAIFA CAMP." },
    ],
  }),
  component: PerfilAgente,
});

const filas = [
  ["Nombre registrado", agente.nombre],
  ["Licencia", agente.licencia],
  ["Número de registro", agente.numero],
  ["Jurisdicción", agente.jurisdiccion],
  ["Vigencia", agente.vigencia],
  ["Antigüedad en la actividad", agente.antiguedad],
];

function PerfilAgente() {
  return (
    <>
      <PageHeader
        title="Mi perfil verificado"
        description="Esta es la ficha que un club visualiza al consultarlo en el directorio. Los datos provienen del registro de UAIFA y no son editables por el agente."
        action={<VerifiedBadge label="Agente FIFA verificado" />}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Datos de licencia" className="lg:col-span-2">
          <dl className="divide-y divide-border">
            {filas.map(([k, v]) => (
              <div key={k} className="flex flex-wrap justify-between gap-2 py-2.5">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                <dd className="text-sm font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <div className="grid gap-4">
          <Stat label="Transferencias completadas" value={String(agente.operaciones)} />
          <Stat label="Cumplimiento de plazos" value={`${agente.cumplimientoPlazos}%`} />
          <Stat
            label="Disputas"
            value={`${agente.disputasResueltas}/${agente.disputasRegistradas}`}
            hint="Resueltas sobre registradas"
          />
        </div>
      </div>

      <Panel title="Historial operacional" subtitle="Registro validado por UAIFA — visible para clubes autorizados" className="mt-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Últimos 24 meses</p>
            <p className="mt-1 text-sm text-foreground">19 transferencias definitivas · 7 cesiones</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Mercados operados</p>
            <p className="mt-1 text-sm text-foreground">Argentina, Uruguay, Chile, Portugal, Suiza</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Observaciones activas</p>
            <p className="mt-1 text-sm text-foreground">Ninguna</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Tag tone="ok">Examen FIFA aprobado 2023</Tag>
          <Tag tone="ok">Sin sanciones vigentes</Tag>
          <Tag tone="warn">1 disputa en curso</Tag>
          <Tag>Especialización: mercado europeo de reventa</Tag>
        </div>
      </Panel>
    </>
  );
}
