"use client";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

type Props = { jsonPath: string; audioPath: string; className?: string; };

export default function LottieAudioButton({ jsonPath, audioPath, className }: Props) {
  const btnRef = useRef<HTMLButtonElement|null>(null);
  const holderRef = useRef<HTMLSpanElement|null>(null);

  useEffect(() => {
    if (!btnRef.current || !holderRef.current) return;
    const btn = btnRef.current;
    const holder = holderRef.current;
    const audio = new Audio(audioPath);
    audio.preload = "auto"; audio.loop = false;

    // Debug pour Vercel
    console.log("Loading Lottie from:", jsonPath);
    console.log("Audio from:", audioPath);

    // Vérifier si le fichier existe
    fetch(jsonPath)
      .then(response => {
        console.log("Lottie file status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Lottie file loaded successfully:", data);
      })
      .catch(error => {
        console.error("Error loading Lottie file:", error);
      });

    let anim: any;

    // Essayer de charger le Lottie avec fetch d'abord
    fetch(jsonPath)
      .then(response => response.json())
      .then(animationData => {
        console.log("Loading Lottie with animationData");
        anim = lottie.loadAnimation({
          container: holder,
          renderer: "svg",
          loop: true,
          autoplay: false,
          animationData: animationData,
          rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
        });

        setupAnimationEvents(anim);
      })
      .catch(error => {
        console.error("Failed to load Lottie with fetch, trying direct path:", error);
        
        // Fallback: essayer avec le chemin direct
        anim = lottie.loadAnimation({
          container: holder,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: jsonPath,
          rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
        });

        setupAnimationEvents(anim);
      });

    function setupAnimationEvents(animation: any) {
      animation.addEventListener('data_ready', () => {
        console.log("Lottie data ready");
      });
      
      animation.addEventListener('DOMLoaded', () => {
        console.log("Lottie DOM loaded");
        // Masquer le fallback quand le Lottie est chargé
        const fallback = btn.querySelector('.lottie-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.display = 'none';
        }
      });
      
      animation.addEventListener('error', (error: any) => {
        console.error("Lottie error:", error);
        // Garder le fallback visible en cas d'erreur
      });
    }

    let playing = false;
    const updateA11y = (p:boolean) => {
      btn.setAttribute("aria-pressed", String(p));
      const label = p ? "Mettre en pause l'animation et la musique" : "Lire l'animation et la musique";
      btn.setAttribute("aria-label", label); btn.title = label;
    };
    
    const playAll = () => { 
      if (audio.ended) audio.currentTime = 0; 
      if (anim) anim.play(); 
      audio.play().catch(()=>{}); 
      playing = true; 
      updateA11y(true); 
    };
    
    const pauseAll = () => { 
      if (anim) anim.pause(); 
      audio.pause(); 
      playing = false; 
      updateA11y(false); 
    };

    const onClick = () => (playing ? pauseAll() : playAll());
    const onEnded = () => pauseAll();
    const onKey = (e:KeyboardEvent) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onClick(); } };

    btn.addEventListener("click", onClick);
    btn.addEventListener("keydown", onKey);
    audio.addEventListener("ended", onEnded);

    return () => {
      btn.removeEventListener("click", onClick);
      btn.removeEventListener("keydown", onKey);
      audio.removeEventListener("ended", onEnded);
      if (anim) anim.destroy();
    };
  }, [jsonPath, audioPath]);

  return (
    <div id="lottie-menu-wrapper" aria-label="Animation et musique" className={className}>
      <button id="lottie-btn" ref={btnRef} type="button" aria-pressed="false" aria-label="Lire l'animation et la musique">
        <span id="lottie-holder" ref={holderRef} aria-hidden="true" />
        {/* Fallback visuel si Lottie ne se charge pas */}
        <span className="lottie-fallback" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          background: 'var(--main-color)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          ♫
        </span>
      </button>
    </div>
  );
}
