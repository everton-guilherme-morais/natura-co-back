import { Controller, Get, Query } from '@nestjs/common';
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
  searchProducts(@Query('sex') sex?: string, @Query('name') name?: string) {
    return this.productsService.searchProducts(sex, name);
  }
}
