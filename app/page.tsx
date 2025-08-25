import HomeHeader from "@/components/menu/HomeHeader";
import ParallaxHero from "@/components/hero/ParallaxHero";
import BookingOverlay from "@/components/hero/BookingOverlay";
import TwoColumnScrollSlider from "@/components/columns/TwoColumnScrollSlider";
import IbuSwitchScroll from "@/components/switch/IbuSwitchScroll";
import CommitmentsScroll from "@/components/commitments/CommitmentsScroll";

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-canvas text-ink" style={{ backgroundColor: '#FCF8E3' }}>
      {/* Header avec logo intégré */}
      <HomeHeader />

      {/* HERO (fond canvas visible sous le menu) */}
      <ParallaxHero />

      {/* Widget visuel de "réservation" posé au-dessus du hero (absolute bas) */}
      <BookingOverlay />

      {/* === Première section sous le Hero === */}
      <TwoColumnScrollSlider />

      {/* === IBU switch scroll (visuel sticky + texte scroll + switch image) === */}
      <IbuSwitchScroll />

      {/* === Section "Nos engagements – scroll switch" === */}
      <CommitmentsScroll />

      {/* contenu supplémentaire */}
      <section className="h-[80vh] bg-canvas" style={{ backgroundColor: '#FCF8E3' }} />
    </main>
  );
}
