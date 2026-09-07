import { createFileRoute } from "@tanstack/react-router";
import { PaginaClub } from "@/components/paginas";

export const Route = createFileRoute("/jugador/equipo/$clubId")({
  head: () => ({
    meta: [
      { title: "Plantel del club — UAIFA CAMP" },
      { name: "description", content: "Plantel profesional registrado en UAIFA con fichas individuales enlazadas." },
      { property: "og:title", content: "Plantel del club — UAIFA CAMP" },
      { property: "og:description", content: "Plantel registrado con fichas individuales enlazadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const { clubId } = Route.useParams();
    return <PaginaClub clubId={clubId} base="/jugador" />;
  },
});
