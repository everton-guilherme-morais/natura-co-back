import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { cartSchema } from './entities/validation/productValidation';
import { z } from 'zod';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('search')
  searchProducts(
    @Query('category') category?: string,
    @Query('name') name?: string,
  ) {
    return this.productsService.searchProducts(category, name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productsService.findProductById(productId);
  }

  @Post('cart')
  async addProductsToCart(
    @Body() cartData: z.infer<typeof cartSchema>,
  ): Promise<{ sessionId: string }> {
    const parsedData = cartSchema.safeParse(cartData);

    if (!parsedData.success) {
      throw new BadRequestException('Invalid payload');
    }
    console.log(parsedData.data, 'parsedData.data');
    return this.productsService.addProductsToCart(parsedData.data);
  }
}
