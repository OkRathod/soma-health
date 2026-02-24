import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSlider } from "@/components/landing/FeatureSlider";
import { FeaturesBento } from "@/components/landing/FeaturesBento";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* 1. Glass Navbar */}
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <FeatureSlider />
        <FeaturesBento />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}