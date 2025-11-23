import Image from 'next/image';
import { findImage } from '@/lib/image-helper';
import { Card, CardContent } from '../ui/card';
import { Leaf, HeartPulse, BrainCircuit } from 'lucide-react';

export function AboutSection() {
  const aboutImage = findImage('about_us');
  return (
    <section id="about" className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">О БиоРитме</h2>
            <p className="text-lg text-muted-foreground">
              В «БиоРитме» мы верим, что здоровая жизнь — это гармоничное сочетание физической активности, осознанного питания и ментального благополучия. Наша миссия — предоставить вам инструменты, знания и поддержку для достижения ваших личных рекордов.
            </p>
            <p className="text-muted-foreground">
              Наша команда сертифицированных экспертов с энтузиазмом помогает вам раскрыть свой потенциал и выработать устойчивые привычки для яркой и полноценной жизни.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Leaf className="h-7 w-7 text-accent" />
                <span className="font-semibold">Целостный</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <HeartPulse className="h-7 w-7 text-accent" />
                <span className="font-semibold">Персональный</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <BrainCircuit className="h-7 w-7 text-accent" />
                <span className="font-semibold">Научный</span>
              </div>
            </div>
          </div>
          <div>
            {aboutImage && (
              <Card className="overflow-hidden shadow-2xl rounded-xl">
                <CardContent className="p-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    className="object-cover w-full h-auto"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
