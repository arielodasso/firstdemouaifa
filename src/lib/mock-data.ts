// Datos ilustrativos del prototipo UAIFA CAMP. Sin backend ni persistencia.

export type Rol = "agente" | "club" | "jugador" | "uaifa";

export const agente = {
  nombre: "Martín Solari Estévez",
  licencia: "Licencia FIFA Football Agent — Categoría A",
  numero: "FA-AR-2019-00417",
  vigencia: "31/03/2027",
  jurisdiccion: "AFA — Argentina",
  region: "Conosur",
  verificado: true,
  operaciones: 68,
  cumplimientoPlazos: 94,
  disputasRegistradas: 5,
  disputasResueltas: 4,
  antiguedad: "Desde 2014",
};

export const carteraJugadores = [
  {
    id: "j-01",
    nombre: "Tomás Ferreyra",
    posicion: "Extremo izquierdo",
    edad: 22,
    club: "Club Atlético Rosario Norte",
    pais: "Argentina",
    contratoHasta: "06/2027",
    valuacionMin: 2.4,
    valuacionMax: 3.1,
    confianza: 82,
    verificada: true,
    estado: "En negociación",
  },
  {
    id: "j-02",
    nombre: "Ezequiel Rondán",
    posicion: "Mediocampista central",
    edad: 26,
    club: "Deportivo Costa Azul",
    pais: "Uruguay",
    contratoHasta: "12/2026",
    valuacionMin: 1.1,
    valuacionMax: 1.6,
    confianza: 74,
    verificada: true,
    estado: "Disponible",
  },
  {
    id: "j-03",
    nombre: "Bruno Alcaraz",
    posicion: "Defensor central",
    edad: 17,
    club: "Formativas Santa Fe FC",
    pais: "Argentina",
    contratoHasta: "06/2028",
    valuacionMin: 0.35,
    valuacionMax: 0.6,
    confianza: 58,
    verificada: false,
    estado: "Semillero +16",
  },
  {
    id: "j-04",
    nombre: "Iker Montenegro",
    posicion: "Arquero",
    edad: 24,
    club: "Universidad del Pacífico CD",
    pais: "Chile",
    contratoHasta: "12/2025",
    valuacionMin: 0.8,
    valuacionMax: 1.2,
    confianza: 69,
    verificada: true,
    estado: "Vencimiento próximo",
  },
  {
    id: "j-05",
    nombre: "Santiago Ovalle",
    posicion: "Delantero centro",
    edad: 16,
    club: "Formativas Santa Fe FC",
    pais: "Argentina",
    contratoHasta: "06/2029",
    valuacionMin: 0.2,
    valuacionMax: 0.45,
    confianza: 51,
    verificada: false,
    estado: "Semillero +16",
  },
];

export const datosVerificados: Record<
  string,
  { salario: string; clausula: string; comision: string; vigencia: string }
> = {
  "j-01": {
    salario: "USD 21.500 mensuales",
    clausula: "USD 6.000.000",
    comision: "8% sobre transferencia",
    vigencia: "01/07/2024 — 30/06/2027",
  },
  "j-02": {
    salario: "USD 9.200 mensuales",
    clausula: "USD 2.400.000",
    comision: "6% sobre transferencia",
    vigencia: "01/01/2024 — 31/12/2026",
  },
  "j-03": {
    salario: "USD 1.800 mensuales (formativo)",
    clausula: "No aplica",
    comision: "5% sobre transferencia",
    vigencia: "01/07/2025 — 30/06/2028",
  },
  "j-04": {
    salario: "USD 7.400 mensuales",
    clausula: "USD 1.500.000",
    comision: "7% sobre transferencia",
    vigencia: "01/01/2023 — 31/12/2025",
  },
  "j-05": {
    salario: "USD 1.100 mensuales (formativo)",
    clausula: "No aplica",
    comision: "5% sobre transferencia",
    vigencia: "01/07/2025 — 30/06/2029",
  },
};

export const negociaciones = [
  { id: "n-1", jugador: "Tomás Ferreyra", contraparte: "Sporting Braga B", monto: "USD 2.900.000", etapa: "Oferta presentada", actualizado: "hace 2 días" },
  { id: "n-2", jugador: "Ezequiel Rondán", contraparte: "CD Águilas Doradas", monto: "USD 1.350.000", etapa: "En validación", actualizado: "hace 5 horas" },
  { id: "n-3", jugador: "Iker Montenegro", contraparte: "Club Deportivo Antofagasta", monto: "Cesión con opción", etapa: "Acuerdo alcanzado", actualizado: "ayer" },
  { id: "n-4", jugador: "Bruno Alcaraz", contraparte: "FC Lugano Academy", monto: "USD 480.000", etapa: "En validación", actualizado: "hace 3 días" },
  { id: "n-5", jugador: "Ezequiel Rondán", contraparte: "Montevideo City FC", monto: "USD 1.100.000", etapa: "Cierre", actualizado: "hace 1 semana" },
];

export const etapasMercado = ["Oferta presentada", "En validación", "Acuerdo alcanzado", "Cierre"] as const;

export const semillero = [
  { id: "s-1", nombre: "Bruno Alcaraz", edad: 17, posicion: "Defensor central", pais: "Argentina", club: "Formativas Santa Fe FC", cuotaMinoridad: "Cumplida", derechosFormacion: "Registrados", agente: "Martín Solari Estévez" },
  { id: "s-2", nombre: "Santiago Ovalle", edad: 16, posicion: "Delantero centro", pais: "Argentina", club: "Formativas Santa Fe FC", cuotaMinoridad: "En trámite", derechosFormacion: "Registrados", agente: "Martín Solari Estévez" },
  { id: "s-3", nombre: "Kevin Arriaga", edad: 17, posicion: "Volante ofensivo", pais: "Honduras", club: "CD Olimpia Formativas", cuotaMinoridad: "Cumplida", derechosFormacion: "Parciales", agente: "Lucía Menéndez" },
  { id: "s-4", nombre: "Dylan Ospina", edad: 18, posicion: "Lateral derecho", pais: "Colombia", club: "Academia Cali Sur", cuotaMinoridad: "Cumplida", derechosFormacion: "Registrados", agente: "Rodrigo Paiva" },
  { id: "s-5", nombre: "Mateo Riquelme", edad: 16, posicion: "Mediocampista central", pais: "Paraguay", club: "Guaraní Juveniles", cuotaMinoridad: "Observada", derechosFormacion: "En revisión", agente: "Lucía Menéndez" },
];

export const solicitudesClubes = [
  { id: "r-1", club: "CD Águilas Doradas", pais: "Colombia", perfil: "Mediocampista central, 22-27 años, experiencia en torneo continental", presupuesto: "USD 1.000.000 — 1.600.000", vence: "30/09/2026" },
  { id: "r-2", club: "Sporting Braga B", pais: "Portugal", perfil: "Extremo izquierdo sub-23 con proyección de reventa", presupuesto: "USD 2.500.000 — 3.200.000", vence: "15/10/2026" },
  { id: "r-3", club: "Club Deportivo Antofagasta", pais: "Chile", perfil: "Arquero con 100+ partidos en primera división", presupuesto: "Cesión con opción de compra", vence: "05/10/2026" },
  { id: "r-4", club: "FC Lugano Academy", pais: "Suiza", perfil: "Defensor central +16 sudamericano con cuota de minoridad en regla", presupuesto: "USD 400.000 — 600.000", vence: "20/11/2026" },
];

export const ledger = [
  { fecha: "02/09/2026 14:22", accion: "Alta de acuerdo de representación", parte: "Tomás Ferreyra / M. Solari", hash: "0x8f31a4…c092" },
  { fecha: "28/08/2026 09:05", accion: "Carga de datos contractuales verificados", parte: "Ezequiel Rondán", hash: "0x2b7de1…41aa" },
  { fecha: "21/08/2026 17:40", accion: "Apertura de negociación", parte: "CD Águilas Doradas", hash: "0x91cc03…7e15" },
  { fecha: "14/08/2026 11:12", accion: "Resolución de disputa registrada", parte: "Deportivo Costa Azul", hash: "0x5ad920…b3f7" },
  { fecha: "03/08/2026 08:55", accion: "Renovación de licencia FIFA", parte: "Martín Solari Estévez", hash: "0xe10f7c…22d4" },
  { fecha: "27/07/2026 19:31", accion: "Cambio de visibilidad de valuación verificada", parte: "Tomás Ferreyra", hash: "0x74ba58…9c60" },
];

export const agentesDirectorio = [
  { id: "a-1", nombre: "Martín Solari Estévez", region: "Conosur", licencia: "Categoría A", especializacion: "Mercado europeo de reventa", operaciones: 68, cumplimiento: 94, verificado: true },
  { id: "a-2", nombre: "Lucía Menéndez", region: "Centroamérica", licencia: "Categoría A", especializacion: "Juveniles y derechos de formación", operaciones: 41, cumplimiento: 97, verificado: true },
  { id: "a-3", nombre: "Rodrigo Paiva", region: "Región Andina", licencia: "Categoría B", especializacion: "Arqueros y defensores", operaciones: 23, cumplimiento: 88, verificado: true },
  { id: "a-4", nombre: "Fernanda Quiroz", region: "Brasil", licencia: "Categoría A", especializacion: "Fútbol femenino profesional", operaciones: 57, cumplimiento: 92, verificado: true },
  { id: "a-5", nombre: "Andrés Bulnes", region: "Norteamérica", licencia: "Categoría B", especializacion: "MLS y ligas de desarrollo", operaciones: 15, cumplimiento: 79, verificado: false },
];

export const plantelClub = [
  { nombre: "Iker Montenegro", posicion: "Arquero", edad: 24, contratoHasta: "12/2025", estado: "Vencimiento próximo" },
  { nombre: "Nahuel Bordón", posicion: "Defensor central", edad: 29, contratoHasta: "06/2027", estado: "Vigente" },
  { nombre: "Gastón Prieto", posicion: "Lateral izquierdo", edad: 21, contratoHasta: "12/2028", estado: "Vigente" },
  { nombre: "Elías Vergara", posicion: "Mediocampista", edad: 31, contratoHasta: "12/2025", estado: "Vencimiento próximo" },
  { nombre: "Cristian Bustos", posicion: "Delantero", edad: 27, contratoHasta: "06/2026", estado: "En revisión" },
];

export const historialCarrera = [
  { fecha: "07/2025", evento: "Transferencia definitiva a Club Atlético Rosario Norte", detalle: "Operación validada por UAIFA. Monto y comisión registrados.", tipo: "Transferencia" },
  { fecha: "01/2025", evento: "Cambio de representante", detalle: "Acuerdo de representación con Martín Solari Estévez (FA-AR-2019-00417).", tipo: "Representación" },
  { fecha: "08/2024", evento: "Cesión con opción de compra", detalle: "Cesión por 12 meses a Deportivo Costa Azul. Opción no ejercida.", tipo: "Cesión" },
  { fecha: "03/2024", evento: "Disputa resuelta", detalle: "Reclamo por pagos pendientes cerrado por acuerdo entre partes.", tipo: "Disputa" },
  { fecha: "02/2023", evento: "Primer contrato profesional", detalle: "Firma con Formativas Santa Fe FC. Derechos de formación registrados.", tipo: "Contrato" },
];

export const jugador = {
  nombre: "Tomás Ferreyra",
  posicion: "Extremo izquierdo",
  edad: 22,
  pais: "Argentina",
  club: "Club Atlético Rosario Norte",
  pieHabil: "Derecho",
  altura: "1,76 m",
  agente: "Martín Solari Estévez",
  verificado: true,
};

export const rendimiento = [
  { temporada: "2025/26", partidos: 28, goles: 9, asistencias: 7, minutos: 2210 },
  { temporada: "2024/25", partidos: 31, goles: 6, asistencias: 10, minutos: 2465 },
  { temporada: "2023/24", partidos: 19, goles: 3, asistencias: 4, minutos: 1180 },
];

export const mensajes = [
  { de: "CD Águilas Doradas", tipo: "Club", asunto: "Interés en incorporación para mercado de invierno", fecha: "04/09/2026", estado: "Sin responder" },
  { de: "Sporting Braga B", tipo: "Club", asunto: "Solicitud de acceso a vidriera completa", fecha: "01/09/2026", estado: "Autorizado" },
  { de: "Fernanda Quiroz", tipo: "Agente", asunto: "Consulta sobre vencimiento de acuerdo de representación", fecha: "26/08/2026", estado: "Respondido" },
];

export const colaVerificacion = [
  { id: "v-1", solicitante: "Andrés Bulnes", tipo: "Agente", pais: "México", documentacion: "Licencia FIFA vigente, antecedentes, examen aprobado", ingreso: "03/09/2026" },
  { id: "v-2", solicitante: "Academia Cali Sur", tipo: "Club", pais: "Colombia", documentacion: "Afiliación federativa, registro de formativas", ingreso: "02/09/2026" },
  { id: "v-3", solicitante: "Mateo Riquelme", tipo: "Jugador", pais: "Paraguay", documentacion: "Cuota de minoridad observada — requiere ampliación", ingreso: "31/08/2026" },
  { id: "v-4", solicitante: "Camila Duarte", tipo: "Agente", pais: "Brasil", documentacion: "Licencia FIFA vigente, sin disputas registradas", ingreso: "29/08/2026" },
];

export const metricasUaifa = [
  { label: "Agentes activos verificados", valor: "1.284" },
  { label: "Verificaciones pendientes", valor: "37" },
  { label: "Disputas abiertas", valor: "9" },
  { label: "Operaciones registradas (2026)", valor: "4.612" },
];

export const actividadMensual = [
  { mes: "Abr", operaciones: 312, disputas: 6 },
  { mes: "May", operaciones: 358, disputas: 4 },
  { mes: "Jun", operaciones: 401, disputas: 9 },
  { mes: "Jul", operaciones: 522, disputas: 11 },
  { mes: "Ago", operaciones: 468, disputas: 7 },
  { mes: "Sep", operaciones: 389, disputas: 9 },
];

export const cumplimientoAgentes = [
  { agente: "L. Menéndez", cumplimiento: 97 },
  { agente: "M. Solari", cumplimiento: 94 },
  { agente: "F. Quiroz", cumplimiento: 92 },
  { agente: "R. Paiva", cumplimiento: 88 },
  { agente: "A. Bulnes", cumplimiento: 79 },
];
