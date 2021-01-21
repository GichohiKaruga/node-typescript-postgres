import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import {ProductsData} from "../products/products.data";
import {Product} from "../products/products.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    public async findById(id: number): Promise<Product | null> {
        return await this.productRepository.findOneOrFail(id);
    }

    public async findByCategory(category: number): Promise<Product[] | null> {
        return await this.productRepository.find({ category: category })
    }

    public async create(product: ProductsData): Promise<Product> {
        return await this.productRepository.save(product);
    }

    public async update(
        id: number,
        newValue: ProductsData,
    ): Promise<Product | null> {
        const product = await this.productRepository.findOneOrFail(id);
        if (!product.id) {
            console.error("product doesn't exist");
        }
        await this.productRepository.update(id, newValue);
        return await this.productRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }
    
}


