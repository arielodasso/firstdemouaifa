// Contenido visual ilustrativo: escudos ficticios y retratos ficticios.
import crest1 from "@/assets/crest-1.png";
import crest2 from "@/assets/crest-2.png";
import crest3 from "@/assets/crest-3.png";
import crest4 from "@/assets/crest-4.png";
import crest5 from "@/assets/crest-5.png";
import crest6 from "@/assets/crest-6.png";
import p1 from "@/assets/player-1.jpg";
import p2 from "@/assets/player-2.jpg";
import p3 from "@/assets/player-3.jpg";
import p4 from "@/assets/player-4.jpg";
import p5 from "@/assets/player-5.jpg";
import p6 from "@/assets/player-6.jpg";
import estadio from "@/assets/hero-estadio.jpg";

export const heroEstadio = estadio;

const escudos: Record<string, string> = {
  "c-rosario": crest1,
  "c-costa": crest2,
  "c-santafe": crest3,
  "c-pacifico": crest4,
  "c-aguilas": crest5,
  "c-braga": crest6,
};

const retratos = [p1, p2, p3, p4, p5, p6];

function h(s: string) {
  let n = 5;
  for (let i = 0; i < s.length; i++) n = (n * 33 + s.charCodeAt(i)) % 99991;
  return n;
}

export function escudoDe(clubId: string) {
  return escudos[clubId] ?? crest1;
}

export function retratoDe(jugadorId: string) {
  return retratos[h(jugadorId) % retratos.length]!;
}
