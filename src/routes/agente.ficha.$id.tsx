import { createFileRoute } from "@tanstack/react-router";
import { PaginaJugador } from "@/components/paginas";

export const Route = createFileRoute("/agente/ficha/$id")({
  head: () => ({
    meta: [
      { title: "Ficha del jugador — UAIFA CAMP" },
      { name: "description", content: "Vidriera completa del jugador representado: rendimiento, valuación y trayectoria verificada." },
      { property: "og:title", content: "Ficha del jugador — UAIFA CAMP" },
      { property: "og:description", content: "Rendimiento, valuación y trayectoria del jugador representado." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const { id } = Route.useParams();
    return <PaginaJugador id={id} base="/agente" />;
  },
});
