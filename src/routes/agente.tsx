import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BadgeCheck,
  Users,
  Scale,
  KanbanSquare,
  Sprout,
  Network,
  FileSearch,
} from "lucide-react";
import { RoleShell, type NavItem } from "@/components/shell";
import { agente } from "@/lib/mock-data";

const nav: NavItem[] = [
  { to: "/agente", label: "Panel general", icon: LayoutDashboard },
  { to: "/agente/perfil", label: "Mi perfil verificado", icon: BadgeCheck },
  { to: "/agente/cartera", label: "Cartera de jugadores", icon: Users },
  { to: "/agente/valuacion", label: "Valuación dual", icon: Scale },
  { to: "/agente/mercado", label: "Mercado de pases", icon: KanbanSquare },
  { to: "/agente/semillero", label: "Semillero +16", icon: Sprout },
  { to: "/agente/networking", label: "Networking", icon: Network },
  { to: "/agente/auditoria", label: "Auditoría", icon: FileSearch },
];

export const Route = createFileRoute("/agente")({
  component: () => (
    <RoleShell
      role="Agente intermediario"
      roleLabel="Agente"
      userName={agente.nombre}
      userMeta={`${agente.numero} · ${agente.jurisdiccion}`}
      nav={nav}
    />
  ),
});
