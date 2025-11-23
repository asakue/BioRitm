'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import type { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { findImage } from '@/lib/image-helper';

export function CartItemComponent({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const placeholder = findImage(item.image);

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              data-ai-hint={placeholder.imageHint}
            />
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium">{item.name}</h4>
          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground h-auto p-0 hover:bg-transparent"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Remove
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center text-sm">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
