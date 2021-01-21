import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import {Product} from "../products/products.entity";


describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find product given the id', () => {
    const product: Product = {
      id: 434,
      category: 3,
      title: 'Learn React in 30 days',
      description: 'Become an expert',
      image: 'https://ttthty.br/ghuty',
      price: 45,
      rating: 4
    };

    expect(service).toBeDefined();
  });

});
