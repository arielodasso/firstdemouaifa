import { PageHeader, Panel, Stat, Tag, VerifiedBadge } from "@/components/shell";
import { FichaJugador, TablaPlantel, LinkClub, EscudoClub, RetratoAgente, JugadorInline, ClubInline } from "@/components/ficha";
import { clubes, getClub, getJugador, getAgente, jugadoresDeAgente, plantelDe, valorPlantel } from "@/lib/futbol-data";

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
            {Object.values(clubes)
              .filter((x) => x.id !== clubId)
              .map((x) => (
                <LinkClub
                  key={x.id}
                  base={base}
                  clubId={x.id}
                  className="rounded-sm border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
                >
                  <span className="inline-flex items-center gap-2">
                    <EscudoClub clubId={x.id} size={18} />
                    {x.nombre}
                  </span>
                </LinkClub>
              ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

export function PaginaAgente({ agenteId, base }: { agenteId: string; base: string }) {
  const a = getAgente(agenteId);
  if (!a) {
    return <PageHeader title="Agente no disponible" description="El agente solicitado no figura en el registro ilustrativo." />;
  }
  const cartera = jugadoresDeAgente(a.id);
  const valor = cartera.reduce((s, j) => s + j.valorM, 0);

  return (
    <>
      <PageHeader
        title={a.nombre}
        description={`${a.categoria} · ${a.licencia} · ${a.region}`}
        action={a.verificado ? <VerifiedBadge label="Agente FIFA verificado" /> : <Tag tone="warn">Verificación pendiente</Tag>}
      />

      <Panel className="mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <RetratoAgente id={a.id} size={88} />
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground">{a.nombre}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {a.especializacion} · Registrado desde {a.desde}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{a.contacto}</p>
          </div>
        </div>
      </Panel>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Jugadores representados" value={String(cartera.length)} />
        <Stat label="Valor de la cartera" value={`USD ${valor.toFixed(2)}M`} />
        <Stat label="Cumplimiento de plazos" value={`${a.cumplimiento}%`} hint={`${a.operaciones} operaciones registradas`} />
      </div>

      <Panel title="Jugadores que representa" subtitle="Cada jugador y cada club enlaza a su vista de detalle">
        <ul className="divide-y divide-border">
          {cartera.map((j) => {
            const c = getClub(j.clubId);
            return (
              <li key={j.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <JugadorInline id={j.id} nombre={j.nombre} base={base} size={40} />
                <div className="flex items-center gap-4">
                  {c ? <ClubInline clubId={c.id} nombre={c.nombre} base={base} size={18} /> : null}
                  <span className="text-xs text-muted-foreground">{j.posicionCorta}</span>
                  <span className="text-sm font-medium text-foreground">USD {j.valorM.toFixed(2)}M</span>
                </div>
              </li>
            );
          })}
          {cartera.length === 0 ? (
            <li className="py-3 text-sm text-muted-foreground">Sin jugadores asociados en el registro ilustrativo.</li>
          ) : null}
        </ul>
      </Panel>
    </>
  );
}
