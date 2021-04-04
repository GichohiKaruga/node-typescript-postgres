import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {Order} from "../orders/order.entity";
import {OrdersData} from "../orders/orders.data";


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    public async findAll(): Promise<Order[]> {
        return await this.orderRepository.find();
    }

    public async findById(id: number): Promise<Order | null> {
        return await this.orderRepository.findOneOrFail(id);
    }

    public async create(order: OrdersData): Promise<Order> {
        return await this.orderRepository.save(order);
    }

    public async update(
        id: number,
        newValue: OrdersData,
    ): Promise<Order | null> {
        const order = await this.orderRepository.findOneOrFail(id);
        if (!order.id) {
            console.error("order doesn't exist");
        }
        await this.orderRepository.update(id, newValue);
        return await this.orderRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.orderRepository.delete(id);
    }
}
