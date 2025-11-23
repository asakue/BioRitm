'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { findImage } from '@/lib/image-helper';
import { useCart } from '@/hooks/use-cart';

export function ServiceCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const placeholder = findImage(product.image);

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative w-full h-52">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={placeholder.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-bold font-headline text-primary">{product.price.toFixed(0)} ₽</p>
        <Button onClick={() => addToCart(product)}>В корзину</Button>
      </CardFooter>
    </Card>
  );
}
