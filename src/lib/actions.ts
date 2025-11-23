'use server';

import { recommendOfferings } from '@/ai/flows/intelligent-offerings-tool';
import type { CartItem } from './types';
import { getCart as getCartFromDb, saveCart as saveCartToDb } from '@/ai/tools/firestore-tools';


export async function getCart(userId: string) {
  try {
    const cartData = await getCartFromDb({ userId, cartData: null });
    if (cartData?.items) {
      return cartData.items as CartItem[];
    }
    return [];
  } catch (error) {
    console.error('Failed to get cart data:', error);
    return [];
  }
}

export async function saveCart(userId: string, cartItems: CartItem[]) {
  try {
    await saveCartToDb({ userId, cartData: { items: cartItems } });
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
