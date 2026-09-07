import { createFileRoute } from "@tanstack/react-router";
import { PaginaJugador } from "@/components/paginas";

export const Route = createFileRoute("/club/ficha/$id")({
  head: () => ({
    meta: [
      { title: "Ficha del jugador — UAIFA CAMP" },
      { name: "description", content: "Vidriera del jugador para scouting: rendimiento, valuación dual y trayectoria verificada." },
      { property: "og:title", content: "Ficha del jugador — UAIFA CAMP" },
      { property: "og:description", content: "Rendimiento, valuación y trayectoria verificada del jugador." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const { id } = Route.useParams();
    return <PaginaJugador id={id} base="/club" />;
  },
});
