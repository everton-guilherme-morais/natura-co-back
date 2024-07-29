import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';

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

describe('ProductsController (Integration - Data Retrieval)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.cart.deleteMany({
      where: { sessionId: mockCartItem.sessionId },
    });
  });

  it('should retrieve cart items and validate data', async () => {
    await request(app.getHttpServer())
      .post('/products/cart')
      .send(mockCartItem)
      .expect(201);

    const cartItems = await prisma.cart.findMany({
      where: { sessionId: mockCartItem.sessionId },
    });

    expect(cartItems).toHaveLength(mockCartItem.products.length);
    cartItems.forEach((item) => {
      expect(item).toMatchObject({
        sessionId: mockCartItem.sessionId,
        productId: mockCartItem.products[0].id,
        quantity: mockCartItem.products[0].quantity,
      });
    });
  });
});
