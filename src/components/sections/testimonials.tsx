import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { findImage } from '@/lib/image-helper';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jessica M.',
    title: 'Fitness Enthusiast',
    quote: "BioRitm's personal training completely transformed my approach to fitness. I'm stronger and more confident than ever!",
    image: 'testimonial1',
  },
  {
    name: 'David L.',
    title: 'Busy Professional',
    quote: 'The nutritional coaching was a game-changer. I have more energy throughout the day and finally understand how to eat for my body.',
    image: 'testimonial2',
  },
  {
    name: 'Sarah K.',
    title: 'Yoga Beginner',
    quote: 'I was nervous about starting yoga, but the mindfulness course was so welcoming and insightful. It\'s now a vital part of my weekly routine.',
    image: 'testimonial3',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 lg:py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">What Our Clients Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          We're proud to have helped so many people on their journey to wellness. Here's what they have to say.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const testimonialImage = findImage(testimonial.image);
            return (
              <Card key={testimonial.name} className="text-left shadow-lg flex flex-col">
                <CardHeader>
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground flex-grow">"{testimonial.quote}"</p>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center">
                    {testimonialImage && (
                      <Image
                        src={testimonialImage.imageUrl}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-4"
                        data-ai-hint={testimonialImage.imageHint}
                      />
                    )}
                    <div>
                      <p className="font-semibold font-headline">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
