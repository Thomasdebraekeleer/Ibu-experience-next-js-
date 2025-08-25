"use client";

import { useEffect, useRef } from "react";
import "@/styles/commitments.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { IbuButton } from "@/components/ui";

export default function CommitmentsScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!gsap) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current!;
    const imgs = Array.from(section.querySelectorAll<HTMLImageElement>(".images-inner img"));
    const items = Array.from(section.querySelectorAll<HTMLLIElement>(".text-list li"));
    const totalImgs = imgs.length;
    if (!totalImgs || items.length !== totalImgs) return;

    // Timeline pin + translation verticale des images
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalImgs * window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const imagesInner = section.querySelector(".images-inner") as HTMLElement;
    tl.to(imagesInner, {
      y: () => -((totalImgs - 1) * window.innerHeight),
      ease: "none",
    });

    // Highlight des items de texte en fonction de la progress
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${totalImgs * window.innerHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        let idx = Math.floor(self.progress * totalImgs);
        // clamp pour éviter l'index = totalImgs (au tout dernier pixel)
        idx = Math.min(Math.max(idx, 0), totalImgs - 1);
        items.forEach((el, i) => el.classList.toggle("active", i === idx));
      },
    });



    return () => {
      tl.scrollTrigger?.kill();
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="scroll-section">
      {/* Colonne gauche */}
      <div className="content-left">
        <h2>Nos engagements</h2>

        <div className="text-wrapper">
          <p>
            Le projet <strong>IBÙ</strong> allie <strong>circuits courts</strong> (produits locaux),
            <strong> éco-énergies</strong> (bois, jacuzzi sobre) et <strong>gestion responsable de l'eau</strong>
            (récupération, sanitaires économes), tout en intégrant des <strong>matériaux durables</strong> et un
            <strong> design bioclimatique</strong> optimisé pour minimiser son <strong>empreinte écologique</strong> et
            <strong> valoriser le territoire</strong>.
          </p>

          <ul className="text-list">
            <li data-index="0" className="active">Durabilité</li>
            <li data-index="1">Circuits courts</li>
            <li data-index="2">Harmonie naturelle</li>
            <li data-index="3">Design bioclimatique</li>
          </ul>
        </div>

        {/* Bouton IBÙ */}
        <div className="flex justify-start pt-4 pb-4 w-full">
          <IbuButton href="/reservations" variant="primary">
            Réserver votre moment
          </IbuButton>
        </div>
      </div>

      {/* Colonne droite (images) */}
      <div className="images-right">
        <div className="images-container">
          <div className="images-inner">
            <img src="/Commitments/Eco responsable durabilité.webp" alt="Éco-responsable 1" data-index="0" />
            <img src="/Commitments/Eco responsable circuits courts.webp" alt="Éco-responsable 2" data-index="1" />
            <img src="/Commitments/Eco responsable Harmonie Naturelle.webp" alt="Éco-responsable 3" data-index="2" />
            <img src="/Commitments/Eco responsable design bio climatique.webp" alt="Éco-responsable 4" data-index="3" />
          </div>
        </div>
      </div>
    </section>
  );
}
