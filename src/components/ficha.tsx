import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { PlayCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import { Panel, Tag, VerifiedBadge } from "@/components/shell";
import {
  getClub,
  plantelDe,
  valorPlantel,
  type JugadorFicha,
} from "@/lib/futbol-data";

// Enlace con destino dinámico según el rol de la sesión de demo.
type AnyLinkProps = {
  to: string;
  params?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
};
const AnyLink = Link as unknown as ComponentType<AnyLinkProps>;

export function LinkJugador({ base, id, children, className = "" }: { base: string; id: string; children: React.ReactNode; className?: string }) {
  return (
    <AnyLink to={`${base}/ficha/$id`} params={{ id }} className={className}>
      {children}
    </AnyLink>
  );
}

export function LinkClub({ base, clubId, children, className = "" }: { base: string; clubId: string; children: React.ReactNode; className?: string }) {
  return (
    <AnyLink to={`${base}/equipo/$clubId`} params={{ clubId }} className={className}>
      {children}
    </AnyLink>
  );
}

const enlace = "text-navy underline-offset-2 hover:underline";

function Heatmap({ datos }: { datos: number[] }) {
  return (
    <div>
      <div className="grid grid-cols-8 gap-[2px] overflow-hidden rounded-sm border border-border bg-border p-[2px]">
        {datos.map((v, i) => (
          <div
            key={i}
            className="aspect-[4/3] bg-navy"
            style={{ opacity: 0.08 + (v / 100) * 0.92 }}
            title={`Intensidad ${v}%`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        <span>Arco propio</span>
        <span>Zona de mayor influencia</span>
        <span>Arco rival</span>
      </div>
    </div>
  );
}

const ejeChico = { fontSize: 10, fill: "var(--muted-foreground)" } as const;

export function FichaJugador({ jugador: j, base }: { jugador: JugadorFicha; base: string }) {
  const club = getClub(j.clubId);
  const t = j.temporadas[0]!;
  const totales = j.temporadas.reduce(
    (a, s) => ({
      partidos: a.partidos + s.partidos,
      goles: a.goles + s.goles,
      asistencias: a.asistencias + s.asistencias,
      minutos: a.minutos + s.minutos,
    }),
    { partidos: 0, goles: 0, asistencias: 0, minutos: 0 },
  );
  const delta =
    j.evolucionValor[j.evolucionValor.length - 1]!.valor - j.evolucionValor[0]!.valor;

  return (
    <div className="grid gap-4">
      {/* Cabecera */}
      <Panel>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  #{j.dorsal} · {j.posicionCorta}
                </p>
                <h2 className="mt-1 text-xl text-foreground">{j.nombre}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {j.posicion} · {j.edad} años · {j.pais}
                </p>
                {club ? (
                  <p className="mt-2 text-sm">
                    <LinkClub base={base} clubId={club.id} className={enlace}>
                      {club.nombre}
                    </LinkClub>
                    <span className="text-muted-foreground"> · {club.liga}</span>
                  </p>
                ) : null}
              </div>
              {j.verificado ? <VerifiedBadge label="Ficha verificada" /> : <Tag tone="warn">Verificación pendiente</Tag>}
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[
                ["Pie hábil", j.pieHabil],
                ["Altura", j.altura],
                ["Contrato", j.contratoHasta],
                ["Representante", j.agente],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 text-foreground">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Partidos", totales.partidos],
                ["Goles", totales.goles],
                ["Asistencias", totales.asistencias],
                ["Minutos", totales.minutos],
              ].map(([k, v]) => (
                <div key={String(k)} className="rounded-sm border border-border p-3">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{k}</p>
                  <p className="font-[family-name:var(--font-display)] text-xl font-bold text-navy">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-institutional flex aspect-video items-center justify-center rounded-sm">
            <div className="text-center">
              <PlayCircle className="mx-auto h-12 w-12 text-gold" />
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-navy-foreground/80">
                Video destacado · Temporada {t.temporada}
              </p>
              <p className="mt-1 text-[11px] text-navy-foreground/50">Material simulado para la demostración</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Gráficos */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Evolución de valuación" subtitle={`USD ${j.valuacionMin}M — ${j.valuacionMax}M · confianza ${j.confianza}%`} className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={j.evolucionValor} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id={`g-${j.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--navy)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--navy)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="fecha" tick={ejeChico} axisLine={false} tickLine={false} />
                <YAxis tick={ejeChico} axisLine={false} tickLine={false} width={44} unit="M" />
                <Tooltip
                  formatter={(v: number) => [`USD ${v}M`, "Valuación"]}
                  contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid var(--border)" }}
                />
                <Area type="monotone" dataKey="valor" stroke="var(--navy)" strokeWidth={2} fill={`url(#g-${j.id})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-success" />
            Variación de {delta >= 0 ? "+" : ""}
            {delta.toFixed(2)}M USD en los últimos 24 meses.
          </p>
        </Panel>

        <Panel title="Perfil de atributos" subtitle="Escala 0-100 sobre observación validada">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={j.atributos} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="atributo" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} />
                <Radar dataKey="valor" stroke="var(--navy)" fill="var(--navy)" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Mapa de calor de influencia" subtitle="Promedio de acciones por zona de la cancha">
          <Heatmap datos={j.heatmap} />
        </Panel>

        <Panel title="Producción por temporada" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...j.temporadas].reverse()} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="temporada" tick={ejeChico} axisLine={false} tickLine={false} />
                <YAxis tick={ejeChico} axisLine={false} tickLine={false} width={36} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid var(--border)" }} />
                <Bar dataKey="goles" name="Goles" fill="var(--navy)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="asistencias" name="Asistencias" fill="var(--silver)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="partidos" name="Partidos" fill="var(--muted-foreground)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      {/* Tablas */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Estadísticas por temporada">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  <th className="pb-2 pr-3 font-semibold">Temporada</th>
                  <th className="pb-2 pr-3 font-semibold">PJ</th>
                  <th className="pb-2 pr-3 font-semibold">G</th>
                  <th className="pb-2 pr-3 font-semibold">A</th>
                  <th className="pb-2 pr-3 font-semibold">Min</th>
                  <th className="pb-2 font-semibold">Amar.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {j.temporadas.map((s) => (
                  <tr key={s.temporada}>
                    <td className="py-2.5 pr-3 font-medium text-foreground">{s.temporada}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.partidos}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.goles}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.asistencias}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.minutos}</td>
                    <td className="py-2.5 text-muted-foreground">{s.amarillas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Trayectoria verificada" subtitle="Cada club enlaza a su plantel completo">
          <ol className="relative space-y-5 border-l border-border pl-5">
            {j.trayectoria.map((h, i) => {
              const c = getClub(h.clubId);
              return (
                <li key={`${h.periodo}-${i}`} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-navy" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {h.periodo} · {h.tipo}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {c ? (
                      <LinkClub base={base} clubId={c.id} className={enlace}>
                        {c.nombre}
                      </LinkClub>
                    ) : (
                      <span className="text-foreground">Club no registrado</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{h.detalle}</p>
                </li>
              );
            })}
          </ol>
        </Panel>
      </div>
    </div>
  );
}

export function TablaPlantel({ clubId, base }: { clubId: string; base: string }) {
  const plantel = plantelDe(clubId);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            <th className="pb-2 pr-3 font-semibold">#</th>
            <th className="pb-2 pr-3 font-semibold">Jugador</th>
            <th className="pb-2 pr-3 font-semibold">Posición</th>
            <th className="pb-2 pr-3 font-semibold">Edad</th>
            <th className="pb-2 pr-3 font-semibold">Nacionalidad</th>
            <th className="pb-2 pr-3 font-semibold">Contrato</th>
            <th className="pb-2 font-semibold">Valuación</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {plantel.map((j) => (
            <tr key={j.id} className="hover:bg-muted/60">
              <td className="py-2.5 pr-3 text-muted-foreground">{j.dorsal}</td>
              <td className="py-2.5 pr-3">
                <LinkJugador base={base} id={j.id} className={`font-medium ${enlace}`}>
                  {j.nombre}
                </LinkJugador>
                {j.verificado ? <span className="ml-2 text-[10px] uppercase tracking-[0.1em] text-gold">Verificado</span> : null}
              </td>
              <td className="py-2.5 pr-3 text-muted-foreground">{j.posicion}</td>
              <td className="py-2.5 pr-3 text-muted-foreground">{j.edad}</td>
              <td className="py-2.5 pr-3 text-muted-foreground">{j.pais}</td>
              <td className="py-2.5 pr-3 text-muted-foreground">{j.contratoHasta}</td>
              <td className="py-2.5 font-medium text-foreground">USD {j.valorM.toFixed(2)}M</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <ArrowUpRight className="h-3.5 w-3.5" />
        Valor total del plantel: USD {valorPlantel(clubId).toFixed(2)}M
      </p>
    </div>
  );
}
