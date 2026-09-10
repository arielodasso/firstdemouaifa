import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Tag, VerifiedBadge } from "@/components/shell";
import { RetratoJugador, ClubInline, LinkJugador } from "@/components/ficha";
import { jugadoresDeAgente, getClub } from "@/lib/futbol-data";

export const Route = createFileRoute("/agente/cartera")({
  head: () => ({
    meta: [
      { title: "Cartera de jugadores — UAIFA CAMP" },
      { name: "description", content: "Jugadores representados, con acceso a su vidriera y su valuación." },
      { property: "og:title", content: "Cartera de jugadores — UAIFA CAMP" },
      { property: "og:description", content: "Listado de representados y su estado de mercado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cartera,
});

function Cartera() {
  const cartera = jugadoresDeAgente("a-solari");

  return (
    <>
      <PageHeader
        title="Cartera de jugadores"
        description="Jugadores bajo acuerdo de representación vigente. Cada ficha habilita la vidriera del jugador y su valuación dual."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {cartera.map((j) => {
          const club = getClub(j.clubId);
          return (
            <Panel key={j.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <RetratoJugador id={j.id} size={56} />
                  <div>
                    <h3 className="text-base">
                      <LinkJugador base="/agente" id={j.id} className="text-navy underline-offset-2 hover:underline">
                        {j.nombre}
                      </LinkJugador>
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {j.posicion} · {j.edad} años · {j.pais}
                    </p>
                  </div>
                </div>
                {j.verificado ? <VerifiedBadge label="Verificado" /> : <Tag tone="warn">Verificación pendiente</Tag>}
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Club</dt>
                  <dd className="mt-1 text-foreground">
                    {club ? <ClubInline clubId={club.id} nombre={club.nombre} base="/agente" size={18} /> : "Sin club"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Contrato hasta</dt>
                  <dd className="mt-1 text-foreground">{j.contratoHasta}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Valuación estimada</dt>
                  <dd className="mt-1 text-foreground">
                    USD {j.valuacionMin}M — {j.valuacionMax}M
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Confianza del modelo</dt>
                  <dd className="mt-1 text-foreground">{j.confianza}%</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/agente/valuacion"
                  className="rounded-sm bg-navy px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-foreground transition-opacity hover:opacity-90"
                >
                  Gestionar valuación
                </Link>
                <Link
                  to="/agente/ficha/$id"
                  params={{ id: j.id }}
                  className="rounded-sm border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-muted"
                >
                  Ver vidriera
                </Link>
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
