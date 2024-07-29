import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { ProductsService } from '../../products/products.service';
import { ProductsController } from '../../products/products.controller';

const invalidMockCartItem = {
  sessionId: 'mock-session-id',
  products: [
    {
      id: 'string-instead-of-number',
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

describe('ProductsController (Integration - Invalid Type)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a 400 error for invalid type', async () => {
    const response = await request(app.getHttpServer())
      .post('/products/cart')
      .send(invalidMockCartItem)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });
});
