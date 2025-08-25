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

    const anim = lottie.loadAnimation({
      container: holder,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: jsonPath,
      rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
    });

    let playing = false;
    const updateA11y = (p:boolean) => {
      btn.setAttribute("aria-pressed", String(p));
      const label = p ? "Mettre en pause l'animation et la musique" : "Lire l'animation et la musique";
      btn.setAttribute("aria-label", label); btn.title = label;
    };
    const playAll = () => { if (audio.ended) audio.currentTime = 0; anim.play(); audio.play().catch(()=>{}); playing = true; updateA11y(true); };
    const pauseAll = () => { anim.pause(); audio.pause(); playing = false; updateA11y(false); };

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
      anim?.destroy();
    };
  }, [jsonPath, audioPath]);

  return (
    <div id="lottie-menu-wrapper" aria-label="Animation et musique" className={className}>
      <button id="lottie-btn" ref={btnRef} type="button" aria-pressed="false" aria-label="Lire l'animation et la musique">
        <span id="lottie-holder" ref={holderRef} aria-hidden="true" />
      </button>
    </div>
  );
}
