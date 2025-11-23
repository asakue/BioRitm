import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { findImage } from '@/lib/image-helper';

export function HeroSection() {
  const heroImage = findImage('hero');

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover brightness-50"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 drop-shadow-md">
          Harmonize Your Life with BioRitm
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow">
          Your journey to a balanced and healthy lifestyle starts here. Discover our expert-led services.
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          Explore Services
        </Button>
      </div>
    </section>
  );
}
