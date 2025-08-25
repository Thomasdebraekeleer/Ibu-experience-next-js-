# Composants UI - IBÙ

## IbuButton

Composant bouton standardisé pour le projet IBÙ avec animation de flèche au hover.

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `string` | **requis** | Texte du bouton |
| `href` | `string` | `undefined` | Lien (transforme le bouton en `<a>`) |
| `variant` | `"primary" \| "inverted"` | `"primary"` | Variante de couleur |
| `className` | `string` | `""` | Classes CSS supplémentaires |
| `onClick` | `() => void` | `undefined` | Fonction de callback (si pas de href) |

### Variantes

#### Primary (par défaut)
- Fond : `#053725` (vert foncé)
- Texte : `#FCF8E3` (beige clair)
- Hover : fond transparent, texte vert foncé

#### Inverted
- Fond : `#FCF8E3` (beige clair)
- Texte : `#053725` (vert foncé)
- Hover : fond vert foncé, texte beige clair

### Utilisation

```tsx
import { IbuButton } from "@/components/ui";

// Bouton avec lien (variante primary)
<IbuButton href="/reservations">
  Réserver votre moment
</IbuButton>

// Bouton avec action (variante inverted)
<IbuButton variant="inverted" onClick={() => console.log("Cliqué !")}>
  Découvrir IBÙ
</IbuButton>

// Avec classes personnalisées
<IbuButton href="/contact" className="text-lg px-8">
  Nous contacter
</IbuButton>
```

### Fonctionnalités

- ✅ Animation de flèche au hover (GSAP)
- ✅ Support des liens et actions onClick
- ✅ Deux variantes de couleurs
- ✅ Classes CSS personnalisables
- ✅ Accessibilité (aria-label)
- ✅ Responsive design
- ✅ Police Archivo intégrée
