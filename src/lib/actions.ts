'use server';

import {
  getCartData,
  saveCartData,
} from '@/ai/flows/persistent-cart-data';
import { recommendOfferings } from '@/ai/flows/intelligent-offerings-tool';
import type { CartItem } from './types';

export async function getCart(userId: string) {
  try {
    const result = await getCartData({ userId, cartData: null });
    if (result.success && result.cartData?.items) {
      return result.cartData.items as CartItem[];
    }
    return [];
  } catch (error) {
    console.error('Failed to get cart data:', error);
    return [];
  }
}

export async function saveCart(userId: string, cartItems: CartItem[]) {
  try {
    await saveCartData({ userId, cartData: { items: cartItems } });
  } catch (error) {
    console.error('Failed to save cart data:', error);
  }
}

export async function getRecommendedOfferings(cartItems: CartItem[]) {
  if (cartItems.length === 0) {
    return [];
  }
  try {
    const itemNames = cartItems.map((item) => item.name);
    const result = await recommendOfferings({ cartItems: itemNames });
    return result.recommendedOfferings;
  } catch (error) {
    console.error('Failed to get recommended offerings:', error);
    return [];
  }
}
