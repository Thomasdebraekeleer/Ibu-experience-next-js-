"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Rendre GSAP disponible globalement
    (window as any).gsap = gsap;
  }, []);

  return <>{children}</>;
}
