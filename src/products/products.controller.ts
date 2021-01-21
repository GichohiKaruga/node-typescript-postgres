import { Body, Controller, Get, HttpStatus, Param, Post, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import {ProductsData} from "./products.data";
import {ProductsService} from "../services/products.service";


@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getProducts(@Response() res) {
        const result = await this.productsService.findAll();
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Get(':id')
    public async getProductById(@Response() res, @Param('id') id: number) {
        const result = await this.productsService.findById(id);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Get(':category')
    public async getProductByCategory(@Response() res, @Param('category') category: number) {
        const result = await this.productsService.findByCategory(category);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    public async create(@Response() res, @Body() productsData: ProductsData) {
        const result = await this.productsService.create(productsData);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    public async update(@Response() res, @Body() productsData: ProductsData) {
        const result = await this.productsService.update(productsData.id, productsData);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }
}

