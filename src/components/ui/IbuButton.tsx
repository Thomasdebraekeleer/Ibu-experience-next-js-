"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface IbuButtonProps {
  children: string;
  href?: string;
  variant?: "primary" | "inverted";
  className?: string;
  onClick?: () => void;
}

export default function IbuButton({ 
  children, 
  href, 
  variant = "primary", 
  className = "",
  onClick 
}: IbuButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    if (!gsap || !buttonRef.current) return;

    const button = buttonRef.current;
    const arrow = button.querySelector(".btnx-arrow");
    if (!arrow) return;

    const t = gsap.timeline({ paused: true });
    t.to(arrow, { xPercent: 120, opacity: 0, duration: 0.28, ease: "power3.in" })
      .set(arrow, { xPercent: -120 })
      .to(arrow, { xPercent: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });

    button.addEventListener("mouseenter", () => t.restart());

    return () => {
      button.removeEventListener("mouseenter", () => t.restart());
    };
  }, []);

  const baseClasses = "btnx inline-flex items-center gap-[0.6em]";
  
  // Appliquer les styles CSS variables selon la variante
  const variantStyles = variant === "inverted" ? {
    "--btn-color": "#053725",
    "--btn-bg": "#FCF8E3", 
    "--btn-border": "#053725"
  } as React.CSSProperties : {
    "--btn-color": "#FCF8E3",
    "--btn-bg": "#053725",
    "--btn-border": "#053725"
  } as React.CSSProperties;

  const buttonClasses = `${baseClasses} ${className}`;

  const buttonContent = (
    <>
      <span className="btnx-label">{children}</span>
      <span className="btnx-arrow w-[1.15em] h-[1.15em] overflow-visible" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h17"></path>
          <path d="M14 5l7 7-7 7"></path>
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <a 
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href} 
        className={buttonClasses}
        style={variantStyles}
        role="button"
        aria-label={children}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button 
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={buttonClasses}
      style={variantStyles}
      type="button"
      aria-label={children}
    >
      {buttonContent}
    </button>
  );
}
