'use client';

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { getCart, saveCart } from '@/lib/actions';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const USER_ID_KEY = 'bioritm_user_id';

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isLoading: boolean;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void;
}


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let storedUserId = localStorage.getItem(USER_ID_KEY);
    if (!storedUserId) {
      storedUserId = crypto.randomUUID();
      localStorage.setItem(USER_ID_KEY, storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const debouncedSaveCart = useCallback(debounce(async (uid: string, items: CartItem[]) => {
    await saveCart(uid, items);
  }, 1000), []);

  useEffect(() => {
    if (userId) {
      const loadCart = async () => {
        setIsLoading(true);
        const items = await getCart(userId);
        setCartItems(items);
        setIsLoading(false);
      };
      loadCart();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && !isLoading) {
      debouncedSaveCart(userId, cartItems);
    }
  }, [cartItems, userId, isLoading, debouncedSaveCart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const { description, ...restOfProduct } = product;
      return [...prevItems, { ...restOfProduct, quantity }];
    });
     toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
