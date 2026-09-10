import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Search,
  Sprout,
  KanbanSquare,
  Scale,
  IdCard,
  ShieldCheck,
  Users,
} from "lucide-react";
import { RoleShell, type NavItem } from "@/components/shell";
import { escudoDe } from "@/lib/media";

const nav: NavItem[] = [
  { to: "/club", label: "Panel general", icon: LayoutDashboard },
  { to: "/club/agentes", label: "Directorio de agentes", icon: Search },
  { to: "/club/semillero", label: "Semillero +16", icon: Sprout },
  { to: "/club/mercado", label: "Mercado de pases", icon: KanbanSquare },
  { to: "/club/duediligence", label: "Due diligence", icon: Scale },
  { to: "/club/vidriera", label: "Vidriera del jugador", icon: IdCard },
  { to: "/club/equipo/c-aguilas", label: "Mi plantel", icon: Users },
  { to: "/club/verificacion", label: "Sello UAIFA Verified", icon: ShieldCheck },
];

export const Route = createFileRoute("/club")({
  component: () => (
    <RoleShell
      role="Club afiliado"
      roleLabel="Club"
      userName="CD Águilas Doradas"
      userMeta="Colombia · Primera División"
      nav={nav}
      avatar={escudoDe("c-aguilas")}
      avatarFit="contain"
    />
  ),
});
