// Base de datos ilustrativa navegable (clubes ↔ planteles ↔ fichas individuales).
// Prototipo UAIFA CAMP. Sin backend ni persistencia.

export type Trayectoria = {
  periodo: string;
  clubId: string;
  tipo: string;
  detalle: string;
};

export type JugadorFicha = {
  id: string;
  nombre: string;
  posicion: string;
  posicionCorta: string;
  edad: number;
  pais: string;
  clubId: string;
  pieHabil: string;
  altura: string;
  contratoHasta: string;
  valorM: number;
  valuacionMin: number;
  valuacionMax: number;
  confianza: number;
  verificado: boolean;
  agente: string;
  agenteId: string;
  dorsal: number;
  temporadas: { temporada: string; partidos: number; goles: number; asistencias: number; minutos: number; amarillas: number }[];
  evolucionValor: { fecha: string; valor: number }[];
  atributos: { atributo: string; valor: number }[];
  heatmap: number[]; // 8 columnas x 5 filas = 40 celdas, 0-100
  trayectoria: Trayectoria[];
};

export type ClubFicha = {
  id: string;
  nombre: string;
  pais: string;
  liga: string;
  estadio: string;
  fundado: number;
  plantelIds: string[];
};

export const clubes: Record<string, ClubFicha> = {
  "c-rosario": {
    id: "c-rosario",
    nombre: "Club Atlético Rosario Norte",
    pais: "Argentina",
    liga: "Liga Profesional Argentina",
    estadio: "Estadio del Norte (28.400)",
    fundado: 1913,
    plantelIds: ["j-01", "p-11", "p-12", "p-13", "p-14", "p-15", "p-16"],
  },
  "c-costa": {
    id: "c-costa",
    nombre: "Deportivo Costa Azul",
    pais: "Uruguay",
    liga: "Primera División Uruguaya",
    estadio: "Parque Costa Azul (12.100)",
    fundado: 1928,
    plantelIds: ["j-02", "p-21", "p-22", "p-23", "p-24"],
  },
  "c-santafe": {
    id: "c-santafe",
    nombre: "Formativas Santa Fe FC",
    pais: "Argentina",
    liga: "Torneo Federal de Formativas",
    estadio: "Complejo Santa Fe (4.500)",
    fundado: 1996,
    plantelIds: ["j-03", "j-05", "p-31", "p-32", "p-33"],
  },
  "c-pacifico": {
    id: "c-pacifico",
    nombre: "Universidad del Pacífico CD",
    pais: "Chile",
    liga: "Primera División de Chile",
    estadio: "Estadio Universitario (18.900)",
    fundado: 1954,
    plantelIds: ["j-04", "p-41", "p-42", "p-43", "p-44"],
  },
  "c-braga": {
    id: "c-braga",
    nombre: "Sporting Braga B",
    pais: "Portugal",
    liga: "Liga Portugal 2",
    estadio: "Estádio 1º de Maio (30.200)",
    fundado: 1921,
    plantelIds: ["p-51", "p-52", "p-53", "p-54"],
  },
  "c-aguilas": {
    id: "c-aguilas",
    nombre: "CD Águilas Doradas",
    pais: "Colombia",
    liga: "Categoría Primera A",
    estadio: "Estadio Alberto Grisales (10.400)",
    fundado: 1949,
    plantelIds: ["p-61", "p-62", "p-63", "p-64", "p-65"],
  },
};

type Semilla = {
  id: string;
  nombre: string;
  posicion: string;
  edad: number;
  pais: string;
  clubId: string;
  valorM: number;
  dorsal: number;
  ofensivo?: boolean;
  arquero?: boolean;
  verificado?: boolean;
  agente?: string;
  contratoHasta?: string;
  pieHabil?: string;
  altura?: string;
  trayectoria?: Trayectoria[];
};

const posCorta: Record<string, string> = {
  "Arquero": "POR",
  "Defensor central": "DFC",
  "Lateral derecho": "LD",
  "Lateral izquierdo": "LI",
  "Mediocampista central": "MC",
  "Volante ofensivo": "MCO",
  "Mediocampista": "MC",
  "Extremo izquierdo": "EI",
  "Extremo derecho": "ED",
  "Delantero centro": "DC",
};

function hash(s: string) {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
  return h;
}

function rnd(seed: number, i: number, min: number, max: number) {
  const x = Math.abs(Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453);
  return Math.round(min + (x - Math.floor(x)) * (max - min));
}

export type AgenteFicha = {
  id: string;
  nombre: string;
  licencia: string;
  categoria: string;
  region: string;
  especializacion: string;
  verificado: boolean;
  operaciones: number;
  cumplimiento: number;
  desde: number;
  contacto: string;
};

export const agentes: Record<string, AgenteFicha> = {
  "a-solari": {
    id: "a-solari",
    nombre: "Martín Solari Estévez",
    licencia: "FA-AR-2019-00417",
    categoria: "Categoría A",
    region: "Conosur",
    especializacion: "Jóvenes con proyección europea",
    verificado: true,
    operaciones: 62,
    cumplimiento: 97,
    desde: 2014,
    contacto: "solari@representacion-uaifa.demo",
  },
  "a-menendez": {
    id: "a-menendez",
    nombre: "Lucía Menéndez",
    licencia: "FA-UY-2020-00822",
    categoria: "Categoría A",
    region: "Conosur",
    especializacion: "Mediocampistas y salidas al exterior",
    verificado: true,
    operaciones: 41,
    cumplimiento: 94,
    desde: 2016,
    contacto: "menendez@representacion-uaifa.demo",
  },
  "a-paiva": {
    id: "a-paiva",
    nombre: "Rodrigo Paiva",
    licencia: "FA-BR-2018-01130",
    categoria: "Categoría B",
    region: "Brasil",
    especializacion: "Formativas y derechos de formación",
    verificado: true,
    operaciones: 28,
    cumplimiento: 89,
    desde: 2018,
    contacto: "paiva@representacion-uaifa.demo",
  },
  "a-quiroz": {
    id: "a-quiroz",
    nombre: "Fernanda Quiroz",
    licencia: "FA-CL-2021-00276",
    categoria: "Categoría B",
    region: "Región Andina",
    especializacion: "Arqueros y defensores centrales",
    verificado: false,
    operaciones: 17,
    cumplimiento: 91,
    desde: 2021,
    contacto: "quiroz@representacion-uaifa.demo",
  },
};

const idPorNombre: Record<string, string> = Object.fromEntries(
  Object.values(agentes).map((a) => [a.nombre, a.id]),
);

function construir(s: Semilla): JugadorFicha {
  const seed = hash(s.id);
  const ofensivo = s.ofensivo ?? false;
  const temporadas = ["2025/26", "2024/25", "2023/24"].map((temporada, i) => {
    const partidos = rnd(seed, i + 1, 14, 34);
    return {
      temporada,
      partidos,
      goles: s.arquero ? 0 : rnd(seed, i + 5, ofensivo ? 4 : 0, ofensivo ? 16 : 5),
      asistencias: s.arquero ? 0 : rnd(seed, i + 9, 0, ofensivo ? 11 : 6),
      minutos: partidos * rnd(seed, i + 13, 55, 90),
      amarillas: rnd(seed, i + 17, 0, 9),
    };
  });
  const meses = ["09/24", "01/25", "06/25", "01/26", "09/26"];
  const evolucionValor = meses.map((fecha, i) => ({
    fecha,
    valor: Number(
      Math.max(0.1, s.valorM * (0.45 + i * 0.14) + rnd(seed, i + 21, -8, 8) / 100).toFixed(2),
    ),
  }));
  const base = s.arquero
    ? ["Reflejos", "Juego aéreo", "Salida con pie", "Posicionamiento", "Uno contra uno", "Regularidad"]
    : ofensivo
      ? ["Definición", "Regate", "Velocidad", "Último pase", "Presión alta", "Regularidad"]
      : ["Recuperación", "Pase largo", "Duelo aéreo", "Anticipación", "Salida limpia", "Regularidad"];
  const atributos = base.map((atributo, i) => ({ atributo, valor: rnd(seed, i + 31, 55, 94) }));
  const heatmap = Array.from({ length: 40 }, (_, i) => {
    const col = i % 8;
    const foco = s.arquero ? 0 : ofensivo ? 6.4 : 3.5;
    const dist = Math.abs(col - foco);
    return Math.max(3, Math.min(100, rnd(seed, i + 41, 20, 100) - dist * 14));
  });

  return {
    id: s.id,
    nombre: s.nombre,
    posicion: s.posicion,
    posicionCorta: posCorta[s.posicion] ?? "MC",
    edad: s.edad,
    pais: s.pais,
    clubId: s.clubId,
    pieHabil: s.pieHabil ?? (rnd(seed, 3, 0, 10) > 3 ? "Derecho" : "Izquierdo"),
    altura: s.altura ?? `1,${rnd(seed, 7, 68, 93)} m`,
    contratoHasta: s.contratoHasta ?? `${["06", "12"][rnd(seed, 11, 0, 1)]}/${2026 + rnd(seed, 12, 0, 3)}`,
    valorM: s.valorM,
    valuacionMin: Number((s.valorM * 0.82).toFixed(2)),
    valuacionMax: Number((s.valorM * 1.24).toFixed(2)),
    confianza: rnd(seed, 19, 52, 92),
    verificado: s.verificado ?? rnd(seed, 23, 0, 10) > 3,
    agente: s.agente ?? ["Martín Solari Estévez", "Lucía Menéndez", "Rodrigo Paiva", "Fernanda Quiroz"][rnd(seed, 29, 0, 3)]!,
    dorsal: s.dorsal,
    temporadas,
    evolucionValor,
    atributos,
    heatmap,
    trayectoria:
      s.trayectoria ??
      [
        { periodo: "2024 — hoy", clubId: s.clubId, tipo: "Transferencia", detalle: "Incorporación definitiva registrada en UAIFA." },
        { periodo: "2022 — 2024", clubId: "c-santafe", tipo: "Formativas", detalle: "Derechos de formación registrados." },
      ],
  };
}

const semillas: Semilla[] = [
  { id: "j-01", nombre: "Tomás Ferreyra", posicion: "Extremo izquierdo", edad: 22, pais: "Argentina", clubId: "c-rosario", valorM: 2.75, dorsal: 11, ofensivo: true, verificado: true, agente: "Martín Solari Estévez", contratoHasta: "06/2027", pieHabil: "Derecho", altura: "1,76 m",
    trayectoria: [
      { periodo: "07/2025 — hoy", clubId: "c-rosario", tipo: "Transferencia", detalle: "Operación validada por UAIFA. Monto y comisión registrados." },
      { periodo: "08/2024 — 06/2025", clubId: "c-costa", tipo: "Cesión", detalle: "Cesión por 12 meses. Opción de compra no ejercida." },
      { periodo: "02/2023 — 07/2024", clubId: "c-santafe", tipo: "Contrato", detalle: "Primer contrato profesional. Derechos de formación registrados." },
    ] },
  { id: "j-02", nombre: "Ezequiel Rondán", posicion: "Mediocampista central", edad: 26, pais: "Uruguay", clubId: "c-costa", valorM: 1.35, dorsal: 5, verificado: true, agente: "Martín Solari Estévez", contratoHasta: "12/2026" },
  { id: "j-03", nombre: "Bruno Alcaraz", posicion: "Defensor central", edad: 17, pais: "Argentina", clubId: "c-santafe", valorM: 0.48, dorsal: 4, verificado: false, agente: "Martín Solari Estévez", contratoHasta: "06/2028" },
  { id: "j-04", nombre: "Iker Montenegro", posicion: "Arquero", edad: 24, pais: "Chile", clubId: "c-pacifico", valorM: 1.0, dorsal: 1, arquero: true, verificado: true, agente: "Martín Solari Estévez", contratoHasta: "12/2025" },
  { id: "j-05", nombre: "Santiago Ovalle", posicion: "Delantero centro", edad: 16, pais: "Argentina", clubId: "c-santafe", valorM: 0.33, dorsal: 9, ofensivo: true, verificado: false, agente: "Martín Solari Estévez", contratoHasta: "06/2029" },

  { id: "p-11", nombre: "Nahuel Bordón", posicion: "Defensor central", edad: 29, pais: "Argentina", clubId: "c-rosario", valorM: 0.9, dorsal: 2 },
  { id: "p-12", nombre: "Gastón Prieto", posicion: "Lateral izquierdo", edad: 21, pais: "Argentina", clubId: "c-rosario", valorM: 1.2, dorsal: 3 },
  { id: "p-13", nombre: "Elías Vergara", posicion: "Mediocampista", edad: 31, pais: "Argentina", clubId: "c-rosario", valorM: 0.6, dorsal: 8 },
  { id: "p-14", nombre: "Cristian Bustos", posicion: "Delantero centro", edad: 27, pais: "Argentina", clubId: "c-rosario", valorM: 1.7, dorsal: 19, ofensivo: true },
  { id: "p-15", nombre: "Federico Anselmi", posicion: "Arquero", edad: 33, pais: "Argentina", clubId: "c-rosario", valorM: 0.4, dorsal: 12, arquero: true },
  { id: "p-16", nombre: "Ramiro Lezcano", posicion: "Volante ofensivo", edad: 23, pais: "Argentina", clubId: "c-rosario", valorM: 1.45, dorsal: 10, ofensivo: true },

  { id: "p-21", nombre: "Diego Bentancur", posicion: "Arquero", edad: 28, pais: "Uruguay", clubId: "c-costa", valorM: 0.55, dorsal: 1, arquero: true },
  { id: "p-22", nombre: "Alan Peirano", posicion: "Defensor central", edad: 25, pais: "Uruguay", clubId: "c-costa", valorM: 0.7, dorsal: 6 },
  { id: "p-23", nombre: "Joaquín Suárez", posicion: "Extremo derecho", edad: 20, pais: "Uruguay", clubId: "c-costa", valorM: 1.1, dorsal: 7, ofensivo: true },
  { id: "p-24", nombre: "Martín Cabrera", posicion: "Delantero centro", edad: 30, pais: "Uruguay", clubId: "c-costa", valorM: 0.8, dorsal: 9, ofensivo: true },

  { id: "p-31", nombre: "Lautaro Giménez", posicion: "Lateral derecho", edad: 18, pais: "Argentina", clubId: "c-santafe", valorM: 0.25, dorsal: 4 },
  { id: "p-32", nombre: "Thiago Cardozo", posicion: "Mediocampista central", edad: 17, pais: "Argentina", clubId: "c-santafe", valorM: 0.3, dorsal: 5 },
  { id: "p-33", nombre: "Emiliano Roldán", posicion: "Arquero", edad: 18, pais: "Argentina", clubId: "c-santafe", valorM: 0.18, dorsal: 1, arquero: true },

  { id: "p-41", nombre: "Vicente Alarcón", posicion: "Defensor central", edad: 27, pais: "Chile", clubId: "c-pacifico", valorM: 0.85, dorsal: 3 },
  { id: "p-42", nombre: "Benjamín Rojas", posicion: "Mediocampista central", edad: 24, pais: "Chile", clubId: "c-pacifico", valorM: 1.05, dorsal: 8 },
  { id: "p-43", nombre: "Matías Fuentealba", posicion: "Extremo izquierdo", edad: 22, pais: "Chile", clubId: "c-pacifico", valorM: 1.6, dorsal: 11, ofensivo: true },
  { id: "p-44", nombre: "Ignacio Pizarro", posicion: "Delantero centro", edad: 29, pais: "Chile", clubId: "c-pacifico", valorM: 1.25, dorsal: 9, ofensivo: true },

  { id: "p-51", nombre: "Rui Meireles", posicion: "Defensor central", edad: 21, pais: "Portugal", clubId: "c-braga", valorM: 1.4, dorsal: 4 },
  { id: "p-52", nombre: "João Ferraz", posicion: "Volante ofensivo", edad: 20, pais: "Portugal", clubId: "c-braga", valorM: 2.1, dorsal: 10, ofensivo: true },
  { id: "p-53", nombre: "Tiago Correia", posicion: "Arquero", edad: 22, pais: "Portugal", clubId: "c-braga", valorM: 0.65, dorsal: 1, arquero: true },
  { id: "p-54", nombre: "Nuno Baptista", posicion: "Extremo derecho", edad: 19, pais: "Portugal", clubId: "c-braga", valorM: 1.8, dorsal: 7, ofensivo: true },

  { id: "p-61", nombre: "Andrés Villalba", posicion: "Arquero", edad: 26, pais: "Colombia", clubId: "c-aguilas", valorM: 0.7, dorsal: 1, arquero: true },
  { id: "p-62", nombre: "Yeison Mosquera", posicion: "Defensor central", edad: 28, pais: "Colombia", clubId: "c-aguilas", valorM: 0.95, dorsal: 2 },
  { id: "p-63", nombre: "Kevin Palacios", posicion: "Mediocampista central", edad: 23, pais: "Colombia", clubId: "c-aguilas", valorM: 1.3, dorsal: 8 },
  { id: "p-64", nombre: "Steven Ocampo", posicion: "Extremo izquierdo", edad: 25, pais: "Colombia", clubId: "c-aguilas", valorM: 1.15, dorsal: 11, ofensivo: true },
  { id: "p-65", nombre: "Jhon Salazar", posicion: "Delantero centro", edad: 24, pais: "Colombia", clubId: "c-aguilas", valorM: 1.5, dorsal: 9, ofensivo: true },
];

export const jugadoresDB: Record<string, JugadorFicha> = Object.fromEntries(
  semillas.map((s) => [s.id, construir(s)]),
);

export const listaJugadores = Object.values(jugadoresDB);

export function getJugador(id: string) {
  return jugadoresDB[id];
}

export function getClub(id: string) {
  return clubes[id];
}

export function plantelDe(clubId: string) {
  return (clubes[clubId]?.plantelIds ?? []).map((id) => jugadoresDB[id]!).filter(Boolean);
}

export function valorPlantel(clubId: string) {
  return plantelDe(clubId).reduce((a, j) => a + j.valorM, 0);
}
