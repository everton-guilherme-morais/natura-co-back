import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { ProductsService } from '../../products/products.service';
import { ProductsController } from '../../products/products.controller';

const mockCartItem = {
  sessionId: 'mock-session-id',
  products: [
    {
      id: 1,
      name: 'Produto Teste',
      brand: 'Marca Teste',
      imageCover: 'http://example.com/image.jpg',
      stars: 5,
      discount: 10,
      category: 'Categoria Teste',
      description: 'Descrição do produto',
      size: 'M',
      instalments: 3,
      priceInitial: '100',
      priceWithDiscount: '90',
      quantity: 1,
      stateProduct: 'Novo',
    },
  ],
};

const mockCartService = {
  addProductsToCart: jest
    .fn()
    .mockResolvedValue({ sessionId: 'mock-session-id' }),
};

describe('ProductsController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockCartService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add products to the cart and return session ID', async () => {
    const response = await request(app.getHttpServer())
      .post('/products/cart')
      .send(mockCartItem)
      .expect(201);

    expect(response.body).toEqual({ sessionId: 'mock-session-id' });
    expect(mockCartService.addProductsToCart).toHaveBeenCalledWith(
      mockCartItem,
    );
  });
});
