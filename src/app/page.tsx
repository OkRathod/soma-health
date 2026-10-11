import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSlider } from "@/components/landing/FeatureSlider";
import { FeaturesBento } from "@/components/landing/FeaturesBento";
import { Footer } from "@/components/landing/Footer";

/** Public landing page: hero → product tour → why / modules / how → CTA + footer. */
export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureSlider />
        <FeaturesBento />
      </main>
      <Footer />
    </div>
  );
}
