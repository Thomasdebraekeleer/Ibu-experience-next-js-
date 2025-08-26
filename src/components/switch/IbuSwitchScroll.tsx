"use client";

import { useEffect, useRef } from "react";
import "@/styles/switch-scroll.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { IbuButton } from "@/components/ui";

export default function IbuSwitchScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const img1Ref = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);
  const item1Ref = useRef<HTMLElement | null>(null);
  const item2Ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!gsap) return;
    gsap.registerPlugin(ScrollTrigger);

    let scrollTriggers: any[] = [];

    // Petit délai pour s'assurer que tout est monté
    const timer = setTimeout(() => {

    const section = sectionRef.current!;
    const visual = visualRef.current!;
    const images = [img1Ref.current!, img2Ref.current!];
    const items = [item1Ref.current!, item2Ref.current!];

    // état initial fidèle
    items[0].classList.add("is-active");
    images[0].classList.add("is-active");
    if (items[1]) (items[1] as HTMLElement).style.opacity = "0.05";

    // crossfade du 2e item
    if (items[1]) {
      gsap.to(items[1], {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: items[1],
          start: "top 60%",
          end: "top 40%",
          scrub: true,
        },
      });
    }

    // apparition/disparition + switch image (aller/retour)
    items.forEach((item, index) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: "top 40%",
        onEnter: () => {
          // Switch des images
          images.forEach((img, i) => img.classList.toggle("is-active", i === index));
          // Switch des articles (opacité)
          items.forEach((it, i) => it.classList.toggle("is-active", i === index));
        },
        onEnterBack: () => {
          // Switch des images
          images.forEach((img, i) => img.classList.toggle("is-active", i === index));
          // Switch des articles (opacité)
          items.forEach((it, i) => it.classList.toggle("is-active", i === index));
        },
        onLeaveBack: () => {
          if (index > 0) {
            const prev = index - 1;
            // Switch des images
            images.forEach((img, i) => img.classList.toggle("is-active", i === prev));
            // Switch des articles (opacité)
            items.forEach((it, i) => it.classList.toggle("is-active", i === prev));
          }
        },
      });
      scrollTriggers.push(st);
    });

    // Pin desktop uniquement
    ScrollTrigger.matchMedia({
      "(min-width: 981px)": function () {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          endTrigger: items[1],
          end: "top 5%",
          pin: visual,
          pinSpacing: true,
          invalidateOnRefresh: true,
        });
        scrollTriggers.push(st);
      },
    });



    }, 100);

    // Rafraîchir les ScrollTriggers
    ScrollTrigger.refresh();

    return () => {
      clearTimeout(timer);
      scrollTriggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="ibu-switch-scroll" ref={sectionRef} className="ibu-ss bg-canvas text-ink">
      <div className="ss-wrap">
        <div className="ss-grid">
          {/* Colonne images (gauche) */}
          <div className="ss-visual" ref={visualRef}>
            <div className="ss-img-stack">
              <img
                ref={img1Ref}
                src="/IBU Switch scroll/IBÙ BIEN-ÊTRE photo 1.webp"
                alt="IBÙ BIEN-ÊTRE - Visuel"
                className="ss-img is-active"
                loading="lazy"
              />
              <img
                ref={img2Ref}
                src="/IBU Switch scroll/IBù SIGNATURE photo 1.webp"
                alt="IBÙ SIGNATURE - Visuel"
                className="ss-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Colonne texte (droite) */}
          <div className="ss-content">
                         {/* Bloc 1 */}
             <article className="ss-item is-active" ref={item1Ref}>
               <p className="ss-subtitle">Le calme ressourçant de</p>
               <h3>IBÙ BIEN-ÊTRE</h3>
               <p>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dui venenatis, vehicula risus sit amet,
                 porta diam. Praesent faucibus leo nec lacus scelerisque facilisis. Morbi quis massa bibendum, condimentum
                 turpis quis, egestas lacus. Fusce dictum ut leo id porta. Maecenas tempor leo arcu, consectetur hendrerit
                 nibh cursus nec. Nam porttitor dui ex, vitae auctor orci gravida at. Proin aliquam, diam sit amet bibendum
                 laoreet, velit sem tincidunt turpis, in gravida felis.
               </p>

               {/* Bouton IBÙ */}
               <div className="flex justify-start pt-4 pb-4 w-full">
                 <IbuButton href="/bien-etre" variant="primary">
                   IBÙ BIEN-ÊTRE
                 </IbuButton>
               </div>
             </article>

                         {/* Bloc 2 */}
             <article className="ss-item" ref={item2Ref}>
               <p className="ss-subtitle">Les délices olfactifs et gustatifs de</p>
               <h3>IBÙ SIGNATURE</h3>
               <p>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dui venenatis, vehicula risus sit amet,
                 porta diam. Praesent faucibus leo nec lacus scelerisque facilisis. Morbi quis massa bibendum, condimentum
                 turpis quis, egestas lacus. Fusce dictum ut leo id porta. Maecenas tempor leo arcu, consectetur hendrerit
                 nibh cursus nec. Nam porttitor dui ex, vitae auctor orci gravida at. Proin aliquam, diam sit amet bibendum
                 laoreet, velit sem tincidunt turpis, in gravida felis.
               </p>

               <div className="flex justify-start pt-4 pb-4 w-full">
                 <IbuButton href="/signature" variant="primary">
                   IBÙ SIGNATURE
                 </IbuButton>
               </div>
             </article>
          </div>
        </div>
      </div>
    </section>
  );
}
