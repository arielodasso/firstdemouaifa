import { PageHeader, Panel, Stat, Tag } from "@/components/shell";
import { FichaJugador, TablaPlantel, LinkClub } from "@/components/ficha";
import { getClub, getJugador, plantelDe, valorPlantel } from "@/lib/futbol-data";

export function PaginaJugador({ id, base }: { id: string; base: string }) {
  const j = getJugador(id);
  if (!j) {
    return (
      <PageHeader title="Ficha no disponible" description="El jugador solicitado no figura en el registro ilustrativo." />
    );
  }
  const club = getClub(j.clubId);
  return (
    <>
      <PageHeader
        title={j.nombre}
        description={`${j.posicion} · ${j.edad} años · ${club?.nombre ?? "Sin club"}`}
        action={<Tag tone="ok">Vidriera del jugador</Tag>}
      />
      <FichaJugador jugador={j} base={base} />
    </>
  );
}

export function PaginaClub({ clubId, base }: { clubId: string; base: string }) {
  const c = getClub(clubId);
  if (!c) {
    return <PageHeader title="Club no disponible" description="El club solicitado no figura en el registro ilustrativo." />;
  }
  const plantel = plantelDe(clubId);
  const edadMedia = plantel.length
    ? (plantel.reduce((a, j) => a + j.edad, 0) / plantel.length).toFixed(1)
    : "—";

  return (
    <>
      <PageHeader
        title={c.nombre}
        description={`${c.liga} · ${c.pais} · ${c.estadio} · Fundado en ${c.fundado}`}
        action={<Tag>Plantel registrado en UAIFA</Tag>}
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Jugadores en plantel" value={String(plantel.length)} />
        <Stat label="Valor total del plantel" value={`USD ${valorPlantel(clubId).toFixed(2)}M`} />
        <Stat label="Edad promedio" value={`${edadMedia} años`} />
      </div>

      <Panel title="Plantel profesional" subtitle="Cada jugador enlaza a su ficha individual">
        <TablaPlantel clubId={clubId} base={base} />
      </Panel>

      <div className="mt-4">
        <Panel title="Clubes relacionados" subtitle="Navegación entre planteles del registro">
          <div className="flex flex-wrap gap-2">
            {Object.values(getClubes())
              .filter((x) => x.id !== clubId)
              .map((x) => (
                <LinkClub
                  key={x.id}
                  base={base}
                  clubId={x.id}
                  className="rounded-sm border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
                >
                  {x.nombre}
                </LinkClub>
              ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function getClubes() {
  return clubesTodos;
}

import { clubes as clubesTodos } from "@/lib/futbol-data";
