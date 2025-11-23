'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { findImage } from '@/lib/image-helper';
import { Card, CardContent } from '../ui/card';
import { Mail, Phone } from 'lucide-react';


const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не менее 2 символов.',
  }),
  email: z.string().email({
    message: 'Пожалуйста, введите действительный адрес электронной почты.',
  }),
  message: z.string().min(10, {
    message: 'Сообщение должно содержать не менее 10 символов.',
  }),
});

export function ContactSection() {
  const { toast } = useToast();
  const contactImage = findImage('contact_us');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Сообщение отправлено!',
      description: 'Спасибо за ваше обращение. Мы скоро свяжемся с вами.',
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Есть вопросы? Мы здесь, чтобы помочь. Заполните форму ниже или свяжитесь с нами напрямую.
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Card className="overflow-hidden shadow-2xl rounded-xl">
                <CardContent className="p-0">
                    {contactImage && (
                        <Image
                            src={contactImage.imageUrl}
                            alt={contactImage.description}
                            width={800}
                            height={600}
                            className="object-cover w-full h-auto"
                            data-ai-hint={contactImage.imageHint}
                        />
                    )}
                </CardContent>
            </Card>

            <div className="bg-card p-8 rounded-xl shadow-lg">
                 <div className="space-y-6">
                    <h3 className="text-2xl font-bold font-headline">Форма обратной связи</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ваше имя</FormLabel>
                                <FormControl>
                                <Input placeholder="Иван Иванов" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input placeholder="example@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Сообщение</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Ваше сообщение..." {...field} rows={5} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">Отправить</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
        <div className="text-center mt-16 space-y-4">
            <h4 className="font-semibold font-headline text-lg">Или свяжитесь напрямую:</h4>
            <div className="flex items-center justify-center gap-8 text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>info@bioritm.com</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+7 (495) 123-45-67</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
