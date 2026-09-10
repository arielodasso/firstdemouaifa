import { createFileRoute } from "@tanstack/react-router";
import { PaginaAgente } from "@/components/paginas";

export const Route = createFileRoute("/club/representante/$agenteId")({
  head: () => ({
    meta: [
      { title: "Perfil del agente — UAIFA CAMP" },
      { name: "description", content: "Perfil del agente representante: licencia, historial operacional y jugadores representados." },
      { property: "og:title", content: "Perfil del agente — UAIFA CAMP" },
      { property: "og:description", content: "Licencia, cumplimiento y cartera de jugadores del agente." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const { agenteId } = Route.useParams();
    return <PaginaAgente agenteId={agenteId} base="/club" />;
  },
});
