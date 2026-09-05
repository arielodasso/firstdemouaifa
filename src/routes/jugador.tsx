import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, IdCard, History, Scale, MessagesSquare } from "lucide-react";
import { RoleShell, type NavItem } from "@/components/shell";
import { jugador } from "@/lib/mock-data";

const nav: NavItem[] = [
  { to: "/jugador", label: "Panel general", icon: LayoutDashboard },
  { to: "/jugador/vidriera", label: "Mi vidriera", icon: IdCard },
  { to: "/jugador/historial", label: "Mi historial de carrera", icon: History },
  { to: "/jugador/valuacion", label: "Mi valuación", icon: Scale },
  { to: "/jugador/mensajes", label: "Mensajes", icon: MessagesSquare },
];

export const Route = createFileRoute("/jugador")({
  component: () => (
    <RoleShell
      role="Jugador registrado"
      roleLabel="Jugador"
      userName={jugador.nombre}
      userMeta={`${jugador.posicion} · ${jugador.club}`}
      nav={nav}
    />
  ),
});
