import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrdersService} from "../services/orders.service";
import {Order} from "./order.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
