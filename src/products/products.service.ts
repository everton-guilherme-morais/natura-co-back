import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  async searchProducts(sex?: string, name?: string) {
    const whereConditions: any = {};

    if (sex) {
      whereConditions.sex = sex;
    }

    if (name) {
      whereConditions.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    return this.prisma.product.findMany({
      where: whereConditions,
      include: {
        assessments: true,
        goodToKnow: true,
      },
    });
  }
}
