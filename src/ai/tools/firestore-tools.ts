'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (getApps().length === 0 && serviceAccount) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = serviceAccount ? getFirestore() : null;

const CartDataSchema = z.object({
  userId: z.string(),
  cartData: z.any(),
});

export const saveCartTool = ai.defineTool(
  {
    name: 'saveCartTool',
    description: 'Saves cart data to Firestore.',
    inputSchema: CartDataSchema,
    outputSchema: z.void(),
  },
  async ({ userId, cartData }) => {
    if (!db) return;
    const cartRef = db.collection('carts').doc(userId);
    await cartRef.set(cartData);
  }
);

export const getCartTool = ai.defineTool(
  {
    name: 'getCartTool',
    description: 'Retrieves cart data from Firestore.',
    inputSchema: z.object({ userId: z.string(), cartData: z.any().nullable() }),
    outputSchema: z.any(),
  },
  async ({ userId }) => {
    if (!db) return null;
    const cartRef = db.collection('carts').doc(userId);
    const doc = await cartRef.get();
    if (doc.exists) {
      return doc.data();
    }
    return null;
  }
);

// Direct functions for server actions
export async function saveCart({ userId, cartData }: z.infer<typeof CartDataSchema>) {
    if (!db) return;
    const cartRef = db.collection('carts').doc(userId);
    await cartRef.set(cartData);
}

export async function getCart({ userId }: { userId: string, cartData: any | null }) {
    if (!db) return null;
    const cartRef = db.collection('carts').doc(userId);
    const doc = await cartRef.get();
    if (doc.exists) {
        return doc.data();
    }
    return null;
}
