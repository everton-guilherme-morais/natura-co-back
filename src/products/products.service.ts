import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { cartSchema } from './entities/validation/productValidation';
import { z } from 'zod';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.product.findMany({
      include: {
        assessments: true,
        goodToKnow: true,
      },
    });
  }

  async searchProducts(category?: string, name?: string) {
    const whereConditions: any = {};

    if (category) {
      whereConditions.category = category;
    }

    if (name) {
      whereConditions.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const results = await this.prisma.product.findMany({
      where: whereConditions,
      include: {
        assessments: true,
        goodToKnow: true,
      },
    });
    return results;
  }

  async findProductById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id: id },
      include: {
        assessments: true,
        goodToKnow: true,
      },
    });
  }

  async addProductsToCart(
    cartData: z.infer<typeof cartSchema>,
  ): Promise<{ sessionId: string }> {
    const cartItems = cartData.products.map((product) => ({
      sessionId: cartData.sessionId,
      productId: product.id,
      quantity: product.quantity,
    }));

    await this.prisma.cart.createMany({
      data: cartItems,
    });

    return { sessionId: cartData.sessionId };
  }
}
