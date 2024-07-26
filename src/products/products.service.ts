import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

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
      whereConditions.sex = category;
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
}
