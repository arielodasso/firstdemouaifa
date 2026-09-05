import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, BadgeCheck, FileSearch, BarChart3 } from "lucide-react";
import { RoleShell, type NavItem } from "@/components/shell";

const nav: NavItem[] = [
  { to: "/uaifa", label: "Panel institucional", icon: LayoutDashboard },
  { to: "/uaifa/verificacion", label: "Gestión de verificación", icon: BadgeCheck },
  { to: "/uaifa/auditoria", label: "Auditoría y evidencia", icon: FileSearch },
  { to: "/uaifa/reportes", label: "Reportes", icon: BarChart3 },
];

export const Route = createFileRoute("/uaifa")({
  component: () => (
    <RoleShell
      role="Administración institucional"
      roleLabel="UAIFA"
      userName="Dirección de Registro y Cumplimiento"
      userMeta="Unión de Agentes Intermediarios de Fútbol de América"
      nav={nav}
    />
  ),
});
