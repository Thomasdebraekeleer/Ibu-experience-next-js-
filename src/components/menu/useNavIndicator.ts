"use client";
import { useEffect, useRef } from "react";

export function useNavIndicator() {
  const dotRef = useRef<HTMLDivElement|null>(null);
  const wrapperRef = useRef<HTMLDivElement|null>(null);
  const activeRef = useRef<HTMLElement|null>(null);
  const dotScale = { current: 0.2 }; // départ petit

  function posIndicator(el: HTMLElement) {
    const indicator = dotRef.current, wrapper = wrapperRef.current;
    if (!indicator || !wrapper || !el) return;
    const linkRect = el.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const d = indicator.offsetWidth;
    const offY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--indicator-offset")) || 0;
    const centerX = (linkRect.left + linkRect.right) / 2 - wrapperRect.left;
    const x = Math.round(centerX - d / 2);
    indicator.style.transform = `translateX(${x}px) translateY(${offY}px) scale(${dotScale.current})`;
  }

  function initDot() {
    const indicator = dotRef.current!;
    indicator.style.transition = "none";
    posIndicator(activeRef.current!);
    void indicator.offsetWidth;
    indicator.style.transition = "transform .35s cubic-bezier(.3,.08,.25,1), opacity .3s ease";
  }

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".menu-item"));
    activeRef.current = (document.querySelector(".menu-item.active") as HTMLElement) || items[0];
    if (document.fonts?.ready) document.fonts.ready.then(initDot); else window.addEventListener("load", initDot, { once:true });

    items.forEach(el => {
      el.addEventListener("mouseenter", () => posIndicator(el));
      el.addEventListener("mouseleave", e => {
        const toMenuItem = (e.relatedTarget as HTMLElement)?.classList?.contains("menu-item");
        if (!toMenuItem && activeRef.current) posIndicator(activeRef.current);
      });
      el.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("active"));
        el.classList.add("active"); activeRef.current = el; posIndicator(el);
      });
    });

    const onResize = () => activeRef.current && posIndicator(activeRef.current);
    ["resize","orientationchange"].forEach(evt => window.addEventListener(evt, onResize));

    // Animation d'entrée (scale + opacity)
    const onMenuLoaded = () => {
      const indicator = dotRef.current;
      if (!indicator) return;
      const gsap = (window as any).gsap;
      if (gsap) {
        const ctl = { s: dotScale.current };
        gsap.to(ctl, { s:1, duration:.5, ease:"power3.out", onUpdate: () => { dotScale.current = (ctl as any).s; posIndicator(activeRef.current!); }});
        gsap.to(indicator, { opacity:1, duration:.45, ease:"power2.out" });
      } else {
        dotScale.current = 1; indicator.style.opacity = "1"; posIndicator(activeRef.current!);
      }
    };
    window.addEventListener("menu-loaded", onMenuLoaded);

    (window as any).__refreshDot = () => activeRef.current && posIndicator(activeRef.current);

    return () => {
      ["resize","orientationchange"].forEach(evt => window.removeEventListener(evt, onResize));
      window.removeEventListener("menu-loaded", onMenuLoaded);
    };
  }, []);

  return { dotRef, wrapperRef };
}
