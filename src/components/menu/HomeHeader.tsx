"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import LottieAudioButton from "./LottieAudioButton";
import { useNavIndicator } from "./useNavIndicator";
import "@/styles/menu.css";

export default function HomeHeader() {
  const { dotRef, wrapperRef } = useNavIndicator();
  const headerRef = useRef<HTMLElement|null>(null);

  // Ajouter la classe loaded pour rendre les éléments visibles
  useEffect(() => {
    // Attendre que tout soit chargé
    const initMenu = () => {
      document.body.classList.add("loaded");
      (window as any).__refreshDot && (window as any).__refreshDot();
      // Déclencher l'événement menu-loaded pour initialiser le dot indicator
      window.dispatchEvent(new CustomEvent("menu-loaded"));
      
      // Debug pour Vercel
      console.log("Menu loaded, GSAP available:", !!(window as any).gsap);
      console.log("Dot indicator:", document.querySelector(".nav-indicator"));
      console.log("Lottie wrapper:", document.querySelector("#lottie-menu-wrapper"));
    };

    // Essayer immédiatement, puis avec délai pour Vercel
    if (document.readyState === 'complete') {
      initMenu();
    } else {
      window.addEventListener('load', initMenu);
      // Fallback avec délai
      const timer = setTimeout(initMenu, 500);
      return () => {
        window.removeEventListener('load', initMenu);
        clearTimeout(timer);
      };
    }
  }, []);

  // Hide/show au scroll
  useEffect(() => {
    const header = headerRef.current!;
    const apply = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y > 0) {
        header.classList.add("header-hidden");
        document.body.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
        document.body.classList.remove("header-hidden");
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { apply(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <header className="site-header" ref={headerRef}>
      <div className="nav-wrapper" ref={wrapperRef}>
        <div className="nav-row">
          <ul className="nav-group left" id="menu-left">
            <li><Link href="/" className="menu-item active" data-key="accueil">Home</Link></li>
            <li><Link href="/experiences" className="menu-item" data-key="experiences">Experiences</Link></li>
            <li><Link href="/reservations" className="menu-item" data-key="reservations">Reservations</Link></li>
          </ul>

          <div id="logo-slot" aria-hidden="true">
            <a className="site-logo" href="/" aria-label="Accueil">
              <img src="/logo/logo-menu-green.webp" alt="Logo IBU Experience" decoding="async" />
            </a>
          </div>

          <ul className="nav-group right" id="menu-right">
            <li><Link href="/about" className="menu-item" data-key="about">About</Link></li>
            <li><Link href="/partners" className="menu-item" data-key="partner">Become a partner</Link></li>
            <li><Link href="/contact" className="menu-item" data-key="contacts">Contact</Link></li>
          </ul>
        </div>

        <div className="nav-indicator" id="nav-indicator" aria-hidden="true" ref={dotRef} />

        {/* LOTTIE à droite */}
        <LottieAudioButton
          jsonPath="/Lottie/menu/menu-wave.json"
          audioPath="/audio/nature-music.wav"
        />
      </div>
    </header>
  );
}
