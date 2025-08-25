# Implémentation du Menu Custom IBU Experience

## Vue d'ensemble

Ce projet implémente un menu de navigation custom avec les fonctionnalités suivantes :

- **Header fixe** avec navigation à gauche et droite
- **Logo intro** qui apparaît au centre puis monte vers le header
- **Dot indicateur** qui suit le hover et l'item actif
- **Bouton Lottie** avec audio intégré
- **Hide on scroll** - le header se masque lors du scroll
- **Menu uniquement sur la home page** (/)

## Structure des fichiers

### Assets organisés
```
public/
├── logo/logo-menu-green.webp          # Logo principal
├── audio/nature-music.wav             # Audio pour la Lottie
└── lottie/menu/menu-wave.json         # Animation Lottie
```

### Composants React
```
src/components/menu/
├── HomeHeader.tsx                     # Header principal avec navigation
├── LogoIntro.tsx                      # Animation d'intro du logo
├── LottieAudioButton.tsx              # Bouton Lottie + audio
├── useNavIndicator.ts                 # Hook pour le dot indicateur
└── menu.css                           # Styles CSS custom
```

### Pages App Router
```
app/
├── page.tsx                           # Home avec menu custom
├── layout.tsx                         # Layout principal
├── globals.css                        # Styles globaux
└── (site)/
    ├── experiences/page.tsx
    ├── reservations/page.tsx
    ├── about/page.tsx
    ├── partners/page.tsx
    └── contact/page.tsx
```

## Fonctionnalités implémentées

### 1. Navigation avec Dot Indicateur
- 3 liens à gauche : Home, Experiences, Reservations
- 3 liens à droite : About, Become a partner, Contact
- Dot qui suit le hover et se positionne sous l'item actif
- Animation d'entrée avec scale et fade

### 2. Logo Intro Animation
- Apparition au centre de l'écran avec blur
- Hold de 0.35s
- Montée vers le centre du header
- Calcul automatique des positions et échelles

### 3. Lottie + Audio
- Bouton cliquable avec animation Lottie
- Audio synchronisé (play/pause)
- Mise à jour ARIA (aria-pressed, labels)
- Gestion des événements clavier

### 4. Hide on Scroll
- Header se masque dès scroll > 0
- Réapparaît en haut de page
- Optimisé avec requestAnimationFrame

### 5. Apparition séquencée
- Liens apparaissent avec delays progressifs
- Lottie apparaît en dernier
- Géré via CSS avec la classe `.loaded`

## Technologies utilisées

- **Next.js 13+** avec App Router
- **TypeScript** pour le typage
- **Tailwind CSS** pour les styles de base
- **GSAP** pour les animations
- **Lottie-web** pour les animations Lottie
- **CSS Custom Properties** pour les variables

## Variables CSS principales

```css
:root {
  --main-color: #053725;              /* Couleur principale */
  --dot-size: 6px;                    /* Taille du dot */
  --menu-gap: 2rem;                   /* Espacement menu */
  --logo-max-h: clamp(140px,18vw,220px); /* Taille logo max */
  --logo-inline-h: 76;                /* Taille logo inline */
  --menu-lottie-size: clamp(32px,4vw,56px); /* Taille Lottie */
}
```

## Accessibilité

- Labels ARIA appropriés pour le bouton Lottie
- Navigation au clavier supportée
- Contraste respecté avec les couleurs du design system
- Logo overlay décoratif (pointer-events: none)

## Performance

- Lottie en local (pas de CDN)
- Audio preload auto
- requestAnimationFrame pour le scroll
- GSAP optimisé avec will-change
- Pas d'autoplay audio (respect UX)

## Utilisation

Le menu custom n'apparaît que sur la page d'accueil (`/`). Les autres pages utilisent une navigation standard.

Pour tester :
1. `npm run dev`
2. Aller sur `http://localhost:3000`
3. Observer l'animation d'intro du logo
4. Tester le hover sur les liens
5. Cliquer sur la Lottie pour l'audio
6. Scroller pour voir le hide/show du header
