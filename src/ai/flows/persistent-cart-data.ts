'use server';

/**
 * @fileOverview This file implements a Genkit flow to manage persistent cart data using Firestore.
 *
 * The flow includes functions to:
 * - saveCartData: Saves cart data to Firestore for a given user ID.
 * - getCartData: Retrieves cart data from Firestore for a given user ID.
 * - PersistentCartInput: The input type for cart data operations.
 * - PersistentCartOutput: The output type for cart data operations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {firestore} from 'firebase-admin';

const PersistentCartInputSchema = z.object({
  userId: z.string().describe('The unique identifier for the user.'),
  cartData: z.any().describe('The cart data to be saved (e.g., an array of product IDs and quantities).'),
});
export type PersistentCartInput = z.infer<typeof PersistentCartInputSchema>;

const PersistentCartOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the cart data operation was successful.'),
  message: z.string().describe('A message providing additional information about the operation.'),
  cartData: z.any().optional().describe('The cart data that was retrieved from Firestore.'),
});
export type PersistentCartOutput = z.infer<typeof PersistentCartOutputSchema>;

/**
 * Saves cart data to Firestore for a given user ID.
 * @param input - The input containing the user ID and cart data.
 * @returns A promise resolving to a PersistentCartOutput indicating success or failure.
 */
export async function saveCartData(input: PersistentCartInput): Promise<PersistentCartOutput> {
  return persistentCartSaveFlow(input);
}

/**
 * Retrieves cart data from Firestore for a given user ID.
 * @param input - The input containing the user ID.
 * @returns A promise resolving to a PersistentCartOutput containing the cart data, or an empty cart if not found.
 */
export async function getCartData(input: PersistentCartInput): Promise<PersistentCartOutput> {
  return persistentCartGetFlow(input);
}

const persistentCartSaveFlow = ai.defineFlow(
  {
    name: 'persistentCartSaveFlow',
    inputSchema: PersistentCartInputSchema,
    outputSchema: PersistentCartOutputSchema,
  },
  async input => {
    try {
      const db = firestore();
      const cartRef = db.collection('carts').doc(input.userId);
      await cartRef.set(input.cartData);

      return {
        success: true,
        message: 'Cart data saved successfully.',
      };
    } catch (error: any) {
      console.error('Error saving cart data:', error);
      return {
        success: false,
        message: `Failed to save cart data: ${error.message || 'Unknown error'}`,
      };
    }
  }
);

const persistentCartGetFlow = ai.defineFlow(
  {
    name: 'persistentCartGetFlow',
    inputSchema: PersistentCartInputSchema,
    outputSchema: PersistentCartOutputSchema,
  },
  async input => {
    try {
      const db = firestore();
      const cartRef = db.collection('carts').doc(input.userId);
      const doc = await cartRef.get();

      if (doc.exists) {
        const cartData = doc.data();
        return {
          success: true,
          message: 'Cart data retrieved successfully.',
          cartData: cartData,
        };
      } else {
        return {
          success: true,
          message: 'No cart data found for this user.',
          cartData: {},
        };
      }
    } catch (error: any) {
      console.error('Error getting cart data:', error);
      return {
        success: false,
        message: `Failed to get cart data: ${error.message || 'Unknown error'}`,
      };
    }
  }
);