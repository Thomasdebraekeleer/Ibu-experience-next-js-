'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialisation de Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Boucle RAF de Lenis
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Synchronisation avec ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    // Configuration du scroller proxy pour ScrollTrigger
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger sur les mises à jour
    lenisRef.current.on('scroll', () => {
      ScrollTrigger.refresh()
    })

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  return <>{children}</>
}
