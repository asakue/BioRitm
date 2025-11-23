'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { CartSheetContent } from './cart-sheet';
import { Skeleton } from '../ui/skeleton';

export function CartIcon() {
  const { cartItems, isLoading } = useCart();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
          {isLoading ? (
            <Skeleton className="absolute -right-1 -top-1 h-4 w-4 rounded-full" />
          ) : (
            itemCount > 0 && (
              <Badge
                variant="default"
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-primary-foreground"
              >
                {itemCount}
              </Badge>
            )
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">Your Cart</SheetTitle>
        </SheetHeader>
        <CartSheetContent />
      </SheetContent>
    </Sheet>
  );
}
