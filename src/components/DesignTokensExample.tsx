'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function DesignTokensExample() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="container-xui py-20">
        {/* Section Titres */}
        <section className="mb-20">
          <h1 ref={titleRef} className="text-6xl font-bold mb-8">
            Design System XUI
          </h1>
          <h2 className="text-4xl font-semibold mb-6 text-ink">
            Typographie & Couleurs
          </h2>
          <h3 className="text-2xl font-medium mb-4 text-ink">
            Hiérarchie des titres
          </h3>
          <p className="text-lg text-ink mb-8">
            Démonstration du design system avec la police Archivo et les couleurs du thème.
          </p>
        </section>

        {/* Section Couleurs */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Couleurs du Thème</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Couleurs Ink */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Couleurs Ink</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-ink rounded-lg"></div>
                  <div>
                    <p className="font-medium">Ink (DEFAULT)</p>
                    <p className="text-sm text-gray-600">#053725</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-ink-inverse rounded-lg border border-gray-300"></div>
                  <div>
                    <p className="font-medium">Ink Inverse</p>
                    <p className="text-sm text-gray-600">#FCF8E3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Couleurs Canvas */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Couleurs Canvas</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-canvas rounded-lg border border-gray-300"></div>
                  <div>
                    <p className="font-medium">Canvas (DEFAULT)</p>
                    <p className="text-sm text-gray-600">#FCF8E3</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-canvas-inverse rounded-lg"></div>
                  <div>
                    <p className="font-medium">Canvas Inverse</p>
                    <p className="text-sm text-gray-600">#053725</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Démonstration Theme Inverse */}
          <div className="theme-inverse p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Thème Inverse</h3>
            <p className="text-lg mb-4">
              Cette section utilise la classe <code>.theme-inverse</code> pour inverser automatiquement les couleurs.
            </p>
            <button className="bg-ink text-ink-inverse px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Bouton dans le thème inverse
            </button>
          </div>
        </section>

        {/* Section Espacement */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Grille d&apos;Espacement XUI</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48].map((space) => (
              <div key={space} className="text-center">
                <div 
                  className="bg-ink rounded-sm mx-auto mb-2"
                  style={{ 
                    width: `${space * 0.25}rem`, 
                    height: `${space * 0.25}rem`,
                    minWidth: '4px',
                    minHeight: '4px'
                  }}
                ></div>
                <p className="text-xs font-mono">{space}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Border Radius */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['sm', 'md', 'lg', 'xl', '2xl', '3xl'].map((radius) => (
              <div key={radius} className="text-center">
                <div className={`w-20 h-20 bg-ink mx-auto mb-2 rounded-${radius}`}></div>
                <p className="text-sm font-medium">rounded-{radius}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Tailles de Police */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Tailles de Police</h2>
          <div className="space-y-4">
            {[
              { size: 'xs', text: 'Texte extra-small (0.75rem)' },
              { size: 'sm', text: 'Texte small (0.875rem)' },
              { size: 'base', text: 'Texte base (1rem)' },
              { size: 'lg', text: 'Texte large (1.125rem)' },
              { size: 'xl', text: 'Texte extra-large (1.25rem)' },
              { size: '2xl', text: 'Titre 2xl (1.5rem)' },
              { size: '3xl', text: 'Titre 3xl (1.875rem)' },
              { size: '4xl', text: 'Titre 4xl (2.25rem)' },
              { size: '5xl', text: 'Titre 5xl (3rem)' },
              { size: '6xl', text: 'Titre 6xl (3.75rem)' },
            ].map((item) => (
              <div key={item.size} className={`text-${item.size} font-medium`}>
                {item.text}
              </div>
            ))}
          </div>
        </section>

        {/* Section Utilitaires */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Utilitaires Personnalisés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Classes de Couleur</h3>
              <div className="space-y-2">
                <p className="text-ink">.text-ink</p>
                <p className="text-ink-inverse bg-ink p-2 rounded">.text-ink-inverse</p>
                <div className="bg-canvas p-4 rounded border">.bg-canvas</div>
                <div className="bg-canvas-inverse p-4 rounded text-ink-inverse">.bg-canvas-inverse</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Container XUI</h3>
              <div className="bg-gray-100 p-4 rounded">
                <div className="container-xui bg-white p-4 rounded border">
                  <p>Container centré avec padding responsive</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
