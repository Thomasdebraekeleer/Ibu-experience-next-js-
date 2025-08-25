"use client";

import { useEffect, useRef } from "react";
import "@/styles/columns.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Img = { src: string; alt?: string };

const IMAGES: Img[] = [
  { src: "/Caroussel section homepage/Homepage image 3.webp", alt: "Image 3" },
  { src: "/Caroussel section homepage/Homepage image 6.webp", alt: "Image 6" },
  { src: "/Caroussel section homepage/Homepage image 1.webp", alt: "Image 1" },
  { src: "/Caroussel section homepage/Homepage image 7.webp", alt: "Image 7" },
  { src: "/Caroussel section homepage/Homepage image 2.webp", alt: "Image 2" },
  { src: "/Caroussel section homepage/Homepage image 4.webp", alt: "Image 4" },
  { src: "/Caroussel section homepage/Homepage image 5.webp", alt: "Image 5" },
];

export default function TwoColumnScrollSlider() {
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const sliderTrackRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<{ prev: HTMLSpanElement | null; mid: HTMLSpanElement | null; next: HTMLSpanElement | null }>({ prev: null, mid: null, next: null });

  // ====== ANIMATIONS AU SCROLL (container + textes)
  useEffect(() => {
    if (!gsap) return;
    gsap.registerPlugin(ScrollTrigger);

    // container: slide from right + fade-in (scrub)
    if (sliderContainerRef.current) {
      gsap.fromTo(
        sliderContainerRef.current,
        { x: 300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sliderContainerRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }

    // texte: titre + divider + paragraphes (scrub)
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".ibu-title, .ibu-divider, .ibu-paragraph"));
    targets.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 60%",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // ====== SLIDER INFINI
  useEffect(() => {
    const track = sliderTrackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const N = slides.length / 2; // 7 originals + 7 clones
    let idx = 0;

    const getSlideW = () => slides[0].getBoundingClientRect().width;
    let slideW = getSlideW();

    const moveTo = (i: number) => (track.style.transform = `translateX(-${i * slideW}px)`);
    const next = () => {
      idx++;
      moveTo(idx);
      updateDots();
    };
    const prev = () => {
      idx--;
      moveTo(idx);
      updateDots();
    };

    // init
    track.style.transform = `translateX(0)`;

    // resize
    const onResize = () => {
      slideW = getSlideW();
      track.style.transition = "none";
      moveTo(idx);
      void track.offsetWidth; // force reflow
      track.style.transition = "transform .6s ease";
    };
    window.addEventListener("resize", onResize);

    // loop
    const onEnd = () => {
      if (idx >= N) {
        track.style.transition = "none";
        idx = 0;
        moveTo(idx);
        void track.offsetWidth;
        track.style.transition = "transform .6s ease";
      }
      if (idx < 0) {
        track.style.transition = "none";
        idx = N - 1;
        moveTo(idx);
        void track.offsetWidth;
        track.style.transition = "transform .6s ease";
      }
    };
    track.addEventListener("transitionend", onEnd);

    const itv = window.setInterval(next, 3000);

    // dots
    const updateDots = () => {
      const mid = dotsRef.current.mid;
      if (!mid) return;
      mid.classList.add("active");
      // simple pulse sur prev/next à chaque click si tu veux, sinon on laisse l'état visuel
    };
    
    const prevDot = dotsRef.current.prev;
    const nextDot = dotsRef.current.next;
    
    prevDot?.addEventListener("click", prev);
    nextDot?.addEventListener("click", next);

    return () => {
      window.clearInterval(itv);
      track.removeEventListener("transitionend", onEnd);
      window.removeEventListener("resize", onResize);
      prevDot?.removeEventListener("click", prev);
      nextDot?.removeEventListener("click", next);
    };
  }, []);

  // ====== RENDER
  return (
    <section className="w-full h-screen" style={{ backgroundColor: '#FCF8E3' }}>
      <div className="container mx-auto px-4 h-full">
        <div className="two-column-layout" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', height: '100%' }}>
          {/* Colonne gauche — Texte */}
          <div className="column-left">
            <div className="ibu-text-block">
              <h2 className="ibu-title text-4xl md:text-5xl font-semibold tracking-tight">
                L&apos;ART DE S&apos;ÉVADER DANS LES DOMAINES D&apos;EXCEPTION
              </h2>
              <div className="ibu-divider" />
              <p className="ibu-paragraph">
                Dormez en pleine nature, nichés dans des vignobles, châteaux et autres lieux d&apos;exception, à travers la Belgique.
              </p>
              <p className="ibu-paragraph">
                Nos pods au design minimaliste et confortable vous accueillent pour une expérience hors du temps, entre élégance, bien-être et gastronomie locale, à vivre avec ceux que vous aimez.
              </p>
            </div>
          </div>

          {/* Colonne droite — Slider */}
          <div className="column-right">
            <div className="slider-container" ref={sliderContainerRef}>
              <div className="slider-track" ref={sliderTrackRef}>
                {/* 7 images originales */}
                {IMAGES.map((img, i) => (
                  <div className="slide" key={`o-${i}`}>
                    <img src={img.src} alt={img.alt ?? ""} loading="lazy" />
                  </div>
                ))}
                {/* 7 duplicatas pour l'infini */}
                {IMAGES.map((img, i) => (
                  <div className="slide" key={`d-${i}`}>
                    <img src={img.src} alt={img.alt ?? ""} loading="lazy" />
                  </div>
                ))}
              </div>

              <div className="nav-dots">
                <span className="dot prev" ref={(el) => (dotsRef.current.prev = el)} />
                <span className="dot active" ref={(el) => (dotsRef.current.mid = el)} />
                <span className="dot next" ref={(el) => (dotsRef.current.next = el)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
