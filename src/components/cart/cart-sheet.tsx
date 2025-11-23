'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { CartItemComponent } from './cart-item';
import { RecommendedOfferings } from './recommended-offerings';
import { Skeleton } from '../ui/skeleton';
import { SheetFooter } from '../ui/sheet';

export function CartSheetContent() {
  const { cartItems, isLoading } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {isLoading ? (
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      ) : cartItems.length > 0 ? (
        <ScrollArea className="flex-1 pr-4">
          <div className="flex flex-col gap-4 py-4">
            {cartItems.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Ваша корзина пуста.</p>
        </div>
      )}

      {cartItems.length > 0 && !isLoading && (
        <>
          <Separator />
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Итого</span>
              <span>{subtotal.toFixed(2)} ₽</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Доставка и налоги будут рассчитаны при оформлении заказа.
            </p>
          </div>
          <RecommendedOfferings items={cartItems} />
          <SheetFooter className="p-4 border-t">
            <Button className="w-full" size="lg">
              Перейти к оформлению
            </Button>
          </SheetFooter>
        </>
      )}
    </>
  );
}
