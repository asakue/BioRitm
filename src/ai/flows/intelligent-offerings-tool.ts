'use server';

/**
 * @fileOverview An AI agent that provides customized service offerings based on items in the cart.
 *
 * - recommendOfferings - A function that recommends service offerings based on the cart items.
 * - RecommendOfferingsInput - The input type for the recommendOfferings function.
 * - RecommendOfferingsOutput - The return type for the recommendOfferings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendOfferingsInputSchema = z.object({
  cartItems: z.array(
    z.string().describe('The name of the item in the cart')
  ).describe('The list of items in the cart.'),
});
export type RecommendOfferingsInput = z.infer<typeof RecommendOfferingsInputSchema>;

const RecommendOfferingsOutputSchema = z.object({
  recommendedOfferings: z.array(
    z.string().describe('The name of the recommended service offering.')
  ).describe('A list of recommended service offerings based on the cart items.'),
});
export type RecommendOfferingsOutput = z.infer<typeof RecommendOfferingsOutputSchema>;

export async function recommendOfferings(input: RecommendOfferingsInput): Promise<RecommendOfferingsOutput> {
  return recommendOfferingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendOfferingsPrompt',
  input: {schema: RecommendOfferingsInputSchema},
  output: {schema: RecommendOfferingsOutputSchema},
  prompt: `You are an AI assistant specializing in recommending service offerings based on items currently in the user's cart.

  Based on the following items in the cart, what other service offerings would be most relevant and appealing to the user?
  Respond with a list of service offerings, and no other text.

  Cart Items:
  {{#each cartItems}}- {{this}}\n{{/each}}

  Recommended Offerings:`,
});

const recommendOfferingsFlow = ai.defineFlow(
  {
    name: 'recommendOfferingsFlow',
    inputSchema: RecommendOfferingsInputSchema,
    outputSchema: RecommendOfferingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {recommendedOfferings: output!.recommendedOfferings};
  }
);
