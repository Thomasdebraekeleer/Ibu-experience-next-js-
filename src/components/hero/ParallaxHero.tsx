"use client";
import { useEffect, useRef } from "react";
import "@/styles/hero.css";

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement|null>(null);
  const textRef = useRef<HTMLDivElement|null>(null);
  const mainRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    const c = containerRef.current, T = textRef.current, M = mainRef.current;
    if (!c || !T || !M) return;

    // animation d'arrivée pilotée par CSS keyframes — on laisse faire.
    // Parallaxe subtile au scroll (fidèle à ton algo)
    const onScroll = () => {
      const sy = window.pageYOffset || 0;
      const top = c.offsetTop;
      const h = c.offsetHeight;
      if (sy + window.innerHeight < top || sy > top + h) return;
      const rel = sy - top;
      // subtil, sans scale
      T.style.transform = `translate3d(0, ${-rel * 0.05}px, 0)`;
      M.style.transform = `translate3d(0, ${ rel * 0.05}px, 0)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Si on veut démarrer les apparitions juste après le menu:
    const onMenuLoaded = () => {
      // rien à faire ici: les keyframes CSS démarrent dès le montage;
      // si tu veux retarder, on peut ajouter/retirer une classe. Ex (commenté) :
      // c.classList.add("hero-animate");
    };
    window.addEventListener("menu-loaded", onMenuLoaded, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("menu-loaded", onMenuLoaded as any);
    };
  }, []);

  return (
    <section className="hero-canvas-bg relative">
      {/* container en ratio responsive comme dans tes CSS */}
      <div className="parallax-container" ref={containerRef}>
        <div className="text-layer" ref={textRef} />
        <div className="main-layer" ref={mainRef} />
      </div>
    </section>
  );
}
