import { Controller } from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ProductsService} from "../services/products.service";
import {OrdersService} from "../services/orders.service";

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) {}
}
