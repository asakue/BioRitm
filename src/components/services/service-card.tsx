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
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
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
        <p className="text-xl font-bold font-headline text-primary">${product.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
