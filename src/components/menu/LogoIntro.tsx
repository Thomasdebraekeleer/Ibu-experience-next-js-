"use client";
import { useEffect, useRef } from "react";

export default function LogoIntro() {
  const layerRef = useRef<HTMLDivElement|null>(null);
  const imgRef = useRef<HTMLImageElement|null>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const header = document.querySelector(".site-header") as HTMLElement;
    const navWrapper = document.querySelector(".nav-wrapper") as HTMLElement;
    const logoLayer = layerRef.current!;
    const logoImg = imgRef.current!;
    const HOLD_TIME = 0.35;

    const lockHeaderHeight = (finalH?: number) => {
      const h = Math.max(header.offsetHeight, finalH || 0);
      header.style.minHeight = h + "px";
      header.style.height = h + "px";
    };

    const computeTargets = () => {
      const wrapperRect = navWrapper.getBoundingClientRect();
      const logoRect = logoImg.getBoundingClientRect();
      const inlineH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--logo-inline-h")) || 48;
      const ratio = (logoImg.naturalWidth && logoImg.naturalHeight)
        ? (logoImg.naturalWidth / logoImg.naturalHeight)
        : (logoRect.width / Math.max(1, logoRect.height));

      // Calculer la position finale en haut du header
      const finalX = window.innerWidth / 2; // centre horizontal
      const finalY = header.offsetHeight / 2; // centre vertical du header
      const startCenterX = logoRect.left + logoRect.width / 2;
      const startCenterY = logoRect.top + logoRect.height / 2;

      const dx = Math.round(finalX - startCenterX);
      const dy = Math.round(finalY - startCenterY);
      const scale = inlineH / Math.max(1, logoRect.height);
      return { inlineH, dx, dy, scale };
    };

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(logoLayer, { opacity:0, scale:0.9, filter:"blur(10px)" }, { opacity:1, scale:1, filter:"blur(0px)", duration:.9 });
    tl.to({}, { duration: HOLD_TIME });

    const { inlineH, dx, dy, scale } = computeTargets();
    tl.add(() => lockHeaderHeight(inlineH), "<");
    tl.add(() => {
      document.body.classList.add("loaded");
      (window as any).__refreshDot && (window as any).__refreshDot();
      window.dispatchEvent(new CustomEvent("menu-loaded"));
    }, "<");

    tl.set(logoLayer, { zIndex:2000, force3D:true }, "<");
    tl.to(logoLayer, { x:dx, y:dy, scale, duration:.9, ease:"power2.out", onUpdate: () => (window as any).__refreshDot && (window as any).__refreshDot() }, "<");
    
    // À la fin de l'animation, ajuster la position finale
    tl.add(() => {
      logoLayer.style.left = "50%";
      logoLayer.style.top = "0";
      logoLayer.style.transform = "translateX(-50%)";
    });
    

    


    const onResize = () => (window as any).__refreshDot && (window as any).__refreshDot();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div id="logo-layer" ref={layerRef}>
      <a className="site-logo" href="/" aria-label="Accueil">
        <img id="hero-logo" ref={imgRef} src="/logo/logo-menu-green.webp" alt="Logo IBU Experience" decoding="async" />
      </a>
    </div>
  );
}
