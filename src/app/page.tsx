import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <ProductShowcase />
      <Testimonials />

      {/* Footer Placeholder (Quick inline for now) */}
      <footer className="py-24 text-center border-t border-white/5 bg-deep-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
        <p className="text-gray-500 font-body text-sm mb-4">Vertex Interactive © 2026</p>
        <p className="text-accent-gold text-xs tracking-[0.3em] uppercase opacity-60">Engineered for Excellence</p>
      </footer>
    </main>
  );
}
