import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { findImage } from '@/lib/image-helper';
import Link from 'next/link';

export function HeroSection() {
  const heroImage = findImage('hero');

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover brightness-[0.4]"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 drop-shadow-lg">
          Гармонизируйте свою жизнь с БиоРитм
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow">
          Ваш путь к сбалансированному и здоровому образу жизни начинается здесь. Откройте для себя наши услуги под руководством экспертов.
        </p>
        <Button size="lg" asChild>
          <Link href="/#services">Наши услуги</Link>
        </Button>
      </div>
    </section>
  );
}
