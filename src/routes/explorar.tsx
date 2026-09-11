import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import logo from "@/assets/uaifa-logo.png.asset.json";

export const Route = createFileRoute("/explorar")({
  component: LayoutExplorar,
});

function LayoutExplorar() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-navy-deep text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
              <img src={logo.url} alt="UAIFA" className="h-7 w-7 object-contain" />
            </span>
            <span className="font-display text-sm uppercase tracking-[0.06em]">UAIFA CAMP</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 text-xs uppercase tracking-[0.08em]">
            <Link to="/explorar" className="hover:underline">
              Competencias
            </Link>
            <Link
              to="/inicio"
              className="rounded-sm bg-gold px-3 py-1.5 font-semibold text-gold-foreground"
            >
              Ingresar
            </Link>
          </nav>
        </div>
      </header>

      <div className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-5 py-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          Modo demo — datos ilustrativos
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        UAIFA — Unión de Agentes Intermediarios de Fútbol de América. Prototipo de demostración.
      </footer>
    </div>
  );
}
