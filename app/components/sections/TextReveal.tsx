'use client';

import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/src/lib/gsap';
import clsx from 'clsx';

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
  align?: 'left' | 'center' | 'right';
};

export default function TextReveal({ eyebrow, title, body, align = 'center' }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    let split: SplitType | null = null;
    let cleanup = () => {};

    const section = sectionRef.current;
    const bodyEl = bodyRef.current;
    if (!section || !bodyEl) return;

    // Découpe le texte en mots (plus stable que lignes selon layout)
    split = new SplitType(bodyEl, { types: 'words' });

    const words = split.words || [];
    // Masque doux au départ
    gsap.set(words, { willChange: 'transform, opacity', display: 'inline-block' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: true,
      }
    });

    tl.from(words, {
      yPercent: 30,
      opacity: 0,
      rotateX: 8,
      transformOrigin: '50% 100%',
      stagger: { amount: 0.9, from: 'start' },
      ease: 'power3.out',
      duration: 0.8,
    });

    cleanup = () => {
      tl.revert?.();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };

    return () => {
      cleanup();
      try { split?.revert(); } catch {}
    };
  }, []);

  return (
    <section ref={sectionRef} className="section surface-invert min-h-screen flex items-center">
      <div className={clsx('mx-auto max-w-4xl px-6', align === 'center' && 'text-center', align === 'right' && 'text-right')}>
        {eyebrow && (
          <p className="text-small uppercase tracking-wide opacity-80">
            {eyebrow}
          </p>
        )}
        <h2 className="text-h1 mt-4">{title}</h2>
        <p ref={bodyRef} className="text-body mt-6">
          {body}
        </p>
      </div>
    </section>
  );
}
