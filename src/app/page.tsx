import { AboutSection } from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ServiceList } from '@/components/services/service-list';

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServiceList />
      <AboutSection />
      <TestimonialsSection />
    </main>
  );
}
