import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  imageCover: z.string(),
  stars: z.number().min(0).max(5),
  discount: z.number().optional(),
  category: z.string(),
  description: z.string(),
  size: z.string().nullable().optional(),
  instalments: z.number(),
  assessments: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        comment: z.string(),
        stars: z.number().min(0).max(5),
        dateCommment: z.string(),
      }),
    )
    .optional(),
  goodToKnow: z
    .array(
      z.object({
        id: z.number(),
        description: z.string(),
      }),
    )
    .optional(),
  priceInitial: z.string(),
  priceWithDiscount: z.string(),
  quantity: z.number(),
  stateProduct: z.string().optional(),
});

export const cartSchema = z.object({
  sessionId: z.string(),
  products: z.array(productSchema),
});
