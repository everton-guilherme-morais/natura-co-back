import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('search')
  searchProducts(
    @Query('category') sex?: string,
    @Query('name') name?: string,
  ) {
    return this.productsService.searchProducts(sex, name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productsService.findProductById(productId);
  }
}
