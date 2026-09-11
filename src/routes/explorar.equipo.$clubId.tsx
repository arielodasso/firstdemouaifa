import { createFileRoute } from "@tanstack/react-router";
import { PaginaClub } from "@/components/paginas";

export const Route = createFileRoute("/explorar/equipo/$clubId")({
  head: () => ({
    meta: [
      { title: "Plantel del club — UAIFA CAMP" },
      { name: "description", content: "Plantel completo del club con ficha individual de cada jugador." },
      { property: "og:title", content: "Plantel del club — UAIFA CAMP" },
      { property: "og:description", content: "Plantel registrado, valores y fichas enlazadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const { clubId } = Route.useParams();
    return <PaginaClub clubId={clubId} base="/explorar" />;
  },
});
