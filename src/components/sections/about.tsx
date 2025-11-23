import Image from 'next/image';
import { findImage } from '@/lib/image-helper';
import { Card, CardContent } from '../ui/card';
import { Leaf, HeartPulse, BrainCircuit } from 'lucide-react';

export function AboutSection() {
  const aboutImage = findImage('about_us');
  return (
    <section id="about" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">About BioRitm</h2>
            <p className="text-muted-foreground">
              At BioRitm, we believe that a healthy life is a harmonious blend of physical activity, mindful nutrition, and mental well-being. Our mission is to provide you with the tools, knowledge, and support to achieve your personal best.
            </p>
            <p className="text-muted-foreground">
              Our team of certified experts is passionate about helping you unlock your potential and build sustainable habits for a vibrant and fulfilling life.
            </p>
            <div className="flex space-x-8 pt-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-accent" />
                <span className="font-semibold">Holistic</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="h-6 w-6 text-accent" />
                <span className="font-semibold">Personalized</span>
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-accent" />
                <span className="font-semibold">Scientific</span>
              </div>
            </div>
          </div>
          <div>
            {aboutImage && (
              <Card className="overflow-hidden shadow-lg">
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
