"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BookingOverlay() {
  const wrapperRef = useRef<HTMLDivElement|null>(null);
  const arrivalRef = useRef<HTMLDivElement|null>(null);
  const departureRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    // Injecte les dates
    const today = new Date();
    const depart = new Date(today);
    depart.setDate(depart.getDate() + 7);
    const fmt = (d: Date) => d.toISOString().split("T")[0];
    if (arrivalRef.current) arrivalRef.current.textContent = fmt(today);
    if (departureRef.current) departureRef.current.textContent = fmt(depart);

    // Lance l'animation après 2s
    const t = setTimeout(() => {
      const widget = wrapperRef.current?.querySelector<HTMLDivElement>(".booking-widget");
      widget?.classList.add("visible");
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div id="booking-overlay-wrapper" aria-hidden="false" ref={wrapperRef}>
      <div className="booking-widget">
        {/* Arrivée */}
        <div className="booking-item fade-up" style={{ animationDelay: "0.1s" }}>
          <Image src="/hero-parallax/icons/Icon-date-calendar.svg" alt="Calendrier" width={24} height={24} className="booking-icon" />
          <div>
            <div className="booking-label">Arrivée</div>
            <div className="booking-date arrival-date" ref={arrivalRef} />
          </div>
        </div>

        <div className="separator" />

        {/* Départ */}
        <div className="booking-item fade-up" style={{ animationDelay: "0.2s" }}>
          <Image src="/hero-parallax/icons/Icon-date-calendar.svg" alt="Calendrier" width={24} height={24} className="booking-icon" />
          <div>
            <div className="booking-label">Départ</div>
            <div className="booking-date departure-date" ref={departureRef} />
          </div>
        </div>

        <div className="separator" />

        {/* Invités */}
        <div className="booking-item fade-up" style={{ animationDelay: "0.3s" }}>
          <Image src="/hero-parallax/icons/Icon-people.svg" alt="Personnes" width={24} height={24} className="booking-icon" />
          <div>
            <div className="booking-label">Invités</div>
            <div className="booking-info">IBÙ bien être, 2 Adults</div>
          </div>
        </div>

        {/* Bouton */}
        <button className="booking-button fade-up" style={{ animationDelay: "0.4s" }} type="button">
          Vérifier la disponibilité
        </button>
      </div>
    </div>
  );
}
