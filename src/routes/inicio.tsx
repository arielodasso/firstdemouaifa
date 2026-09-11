import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, LineChart, Presentation, ShieldCheck } from "lucide-react";
import logo from "@/assets/uaifa-logo.png.asset.json";

export const Route = createFileRoute("/inicio")({
  head: () => ({
    meta: [
      { title: "UAIFA CAMP — Certified Agents Market Platform" },
      {
        name: "description",
        content:
          "Prototipo institucional de la plataforma de mercado de fútbol de UAIFA: agentes verificados, valuación dual, semillero +16 y evidencia auditada.",
      },
      { property: "og:title", content: "UAIFA CAMP — Certified Agents Market Platform" },
      {
        property: "og:description",
        content:
          "Ingreso por perfil: Agente, Club, Jugador e institucional UAIFA. Datos ilustrativos de demostración.",
      },
    ],
  }),
  component: Ingreso,
});

const perfiles = [
  {
    to: "/agente",
    label: "Agente",
    icon: GraduationCap,
    desc: "Cartera de jugadores, valuación dual, negociaciones y evidencia de operaciones.",
    user: "Martín Solari Estévez",
  },
  {
    to: "/club",
    label: "Club",
    icon: Presentation,
    desc: "Directorio de agentes verificados, scouting +16 y due diligence previa al fichaje.",
    user: "Águilas Doradas FC",
  },
  {
    to: "/jugador",
    label: "Jugador",
    icon: LineChart,
    desc: "Vidriera propia, historial verificado y control de privacidad de la valuación.",
    user: "Tomás Ferreyra",
  },
  {
    to: "/uaifa",
    label: "UAIFA",
    icon: ShieldCheck,
    desc: "Gestión de verificaciones, ledger de evidencia y reportes de cumplimiento.",
    user: "Equipo institucional",
  },
];

function Ingreso() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="flex flex-col items-center text-center">
          <div className="logo-circle">
            <img
              src={logo.url}
              alt="Escudo de la Unión de Agentes Intermediarios de Fútbol de América"
            />
          </div>
          <h1 className="login-title">UAIFA CAMP</h1>
          <p className="login-subtitle">
            Certified Agents Market Platform
          </p>
          <p className="login-intro">
            Plataforma de mercado respaldada institucionalmente por la Unión de Agentes
            Intermediarios de Fútbol de América, reconocida por FIFA. Seleccione el perfil con el
            que desea recorrer la experiencia.
          </p>
          <div className="demo-badge">
            <span className="demo-badge-dot" />
            Modo demo — datos ilustrativos
          </div>
        </div>

        <h2 className="login-section-label">
          Ingresar como
        </h2>

        <div className="profile-grid">
          {perfiles.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="profile-card"
            >
              <div className="flex items-start gap-4">
                <span className="profile-icon">
                  <p.icon />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="profile-title">{p.label}</h3>
                  <p className="profile-description">{p.desc}</p>
                  <p className="profile-user">Usuario: {p.user}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="login-disclaimer">
          Prototipo de experiencia para presentación a stakeholders. Los datos exhibidos son
          ilustrativos y no representan operaciones reales.
        </p>
      </div>
    </div>
  );
}
