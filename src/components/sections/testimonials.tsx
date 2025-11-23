import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { findImage } from '@/lib/image-helper';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Елена М.',
    title: 'Любитель фитнеса',
    quote: "Персональные тренировки в «БиоРитм» полностью изменили мой подход к фитнесу. Я стала сильнее и увереннее в себе, чем когда-либо!",
    image: 'testimonial1',
  },
  {
    name: 'Дмитрий Л.',
    title: 'Занятой профессионал',
    quote: 'Консультации по питанию изменили все. У меня больше энергии в течение дня, и я наконец-то понимаю, как питаться правильно для моего тела.',
    image: 'testimonial2',
  },
  {
    name: 'Светлана К.',
    title: 'Новичок в йоге',
    quote: 'Я нервничала перед началом занятий йогой, но курс по осознанности оказался таким гостеприимным и проницательным. Теперь это важная часть моей еженедельной рутины.',
    image: 'testimonial3',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Что говорят наши клиенты</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
          Мы гордимся тем, что помогли стольким людям на их пути к здоровью. Вот что они говорят.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const testimonialImage = findImage(testimonial.image);
            return (
              <Card key={testimonial.name} className="text-left bg-background shadow-lg rounded-xl flex flex-col p-6">
                <CardContent className="p-0 flex flex-col flex-grow">
                   <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground flex-grow mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center mt-auto">
                    {testimonialImage && (
                      <Image
                        src={testimonialImage.imageUrl}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-4 object-cover h-12 w-12"
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
