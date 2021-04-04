import {Body, Controller, Get, HttpStatus, Param, Post, Response, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {OrdersService} from "../services/orders.service";
import {AuthGuard} from "@nestjs/passport";
import {OrdersData} from "./orders.data";

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getOrders(@Response() res) {
        const result = await this.ordersService.findAll();
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Get(':id')
    public async getOrderById(@Response() res, @Param('id') id: number) {
        const result = await this.ordersService.findById(id);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    public async create(@Response() res, @Body() ordersData: OrdersData) {
        const result = await this.ordersService.create(ordersData);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }
}
