# UAIFA Agent Hub

Quiero un prototipo web de alta fidelidad visual llamado "UAIFA CAMP" (Certified Agents Market Platform), una plataforma de mercado de fútbol respaldada institucionalmente por UAIFA (Unión de Agentes Intermediarios de Fútbol de América, reconocida por FIFA). Es un prototipo de experiencia para mostrar a stakeholders, NO un producto en producción: usá datos de ejemplo (mock) hardcodeados o en un JSON local, sin necesidad de backend real, autenticación real ni base de datos persistente. Pero la experiencia debe SENTIRSE como el producto real ya logueado, no como un catálogo de funcionalidades navegable desde un menú único.

ESTRUCTURA GENERAL

Al entrar, un selector simple de "Ingresar como" con cuatro perfiles: Agente, Club, Jugador, UAIFA (institucional). Cada perfil lleva a su propio dashboard con su propia navegación lateral, mostrando solo las pantallas y datos relevantes a ese rol — como si fuera una sesión real iniciada con ese tipo de usuario. Nada de un menú plano con las 9 funcionalidades listadas por igual para todos.

DISEÑO

Te adjunto el logo oficial de UAIFA. Extraé la paleta de color institucional a partir de ese logo (y de la identidad visible en uaifa.org y elearning.uaifa.org) y aplicala de forma consistente. Tipografías: Montserrat para todo el texto de cuerpo, labels y UI en general; Bank Gothic Bold o Bank Gothic Medium (en mayúsculas) para títulos principales y jerarquía alta. Reservá el dorado/metálico de marca (si está en el logo) exclusivamente para insignias de verificación. Estilo sobrio, de confianza, propio de una federación deportiva respaldada por FIFA — no una estética de startup genérica. Cada pantalla debe mostrar un badge sutil "MODO DEMO — datos ilustrativos".

PERFIL: AGENTE

- Dashboard: resumen de cartera de jugadores representados, negociaciones activas, alertas de vencimiento de licencia.

- Mi perfil verificado: lo que un club ve de mí — licencia FIFA (tipo y vigencia), historial operacional (transferencias completadas, cumplimiento de plazos, disputas registradas vs. resueltas), insignia "Agente FIFA verificado".

- Cartera de jugadores: lista de jugadores representados, cada uno con acceso a su vidriera y su valuación.

- Valuación dual por jugador: tabs "Estimado (público)" con rango y confianza del modelo, y "Verificado (auditado)" donde el agente carga/gestiona datos contractuales reales (salario, cláusula, comisión, vigencia) con switches de visibilidad granular por parte (club vendedor, club comprador, otros agentes).

- Mercado de pases: tablero kanban de sus negociaciones activas por jugador ("Oferta presentada" → "En validación" → "Acuerdo alcanzado" → "Cierre").

- Semillero +16: si representa juveniles, listado de sus jugadores +16 con estado de cuota de minoridad y derechos de formación.

- Networking: solicitudes abiertas de clubes que buscan un perfil de jugador que el agente podría cubrir, con botón "Proponer jugador".

- Auditoría: historial de acuerdos de representación firmados y evidencia de sus propias operaciones (tabla con fecha, acción, hash/firma simulada).

PERFIL: CLUB

- Dashboard: resumen del plantel, necesidades de fichaje abiertas publicadas por el club, alertas de vencimientos contractuales del plantel propio.

- Directorio de agentes verificados: buscador y filtros (región, tipo de licencia, especialización, volumen de operaciones) para encontrar intermediarios, con perfil detallado al hacer click.

- Semillero +16: base de jugadores juveniles con filtros por posición, edad y país, para scouting sin presupuesto propio.

- Mercado de pases: publicar una necesidad de fichaje (formulario simple) y ver el tablero kanban de negociaciones abiertas relacionadas.

- Valuación dual e Historial de carrera verificado de un jugador de interés: para due diligence antes de fichar — línea de tiempo con eventos validados (cambios de representante, cesiones, disputas resueltas) en vez de reconstrucción de prensa.

- Vidriera del jugador: acceso a la ficha completa (video destacado simulado, estadísticas de rendimiento, agente representante) cuando el club está autorizado.

- Sello UAIFA Verified: buscador rápido para confirmar si un agente o jugador tiene verificación activa antes de negociar.

PERFIL: JUGADOR

- Dashboard: mi perfil, mi agente representante actual, estado de mi valuación.

- Mi vidriera: gestionar qué secciones expongo (datos contractuales, rendimiento, multimedia) con toggles de privacidad por sección.

- Mi historial de carrera: línea de tiempo verificada de mi trayectoria.

- Mi valuación: ver mi valuación estimada pública y controlar qué partes pueden ver mi valuación verificada.

- Mensajes/Networking: clubes o agentes interesados en contactarme.

PERFIL: UAIFA (institucional)

- Dashboard: métricas generales de la plataforma (agentes activos, verificaciones pendientes, disputas abiertas).

- Gestión de verificación: cola de agentes/clubes/jugadores pendientes de aprobar el sello "UAIFA Verified", con botón de aprobar/rechazar (simulado).

- Auditoría y evidencia: panel completo tipo ledger con fecha, acción, parte involucrada y hash/firma simulada, botón "Exportar evidencia verificada", y nota aclaratoria: "UAIFA no arbitra disputas — solo custodia evidencia verificada e inmutable."

- Reportes: actividad de la plataforma, patrones de disputa, cumplimiento por agente (gráficos simples con datos de ejemplo).

TONO

Todo el copy en español, tono institucional y profesional, sin lenguaje de marketing genérico de SaaS.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://firstdemouaifa.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6e74d3fa-d452-49d3-a28b-a28c55029003).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
