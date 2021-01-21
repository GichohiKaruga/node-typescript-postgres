import { Body, Controller, Get, HttpStatus, Param, Post, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import {UsersData} from "./users.data";
import {LoginData} from "./login.data";


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getusers(@Response() res) {
        const result = await this.usersService.findAll();
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    public async getUser(@Response() res, @Param('id') id: number) {
        const result = await this.usersService.findById(id);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':email')
    public async getUserByEmail(@Response() res, @Param('email') email: string) {
        const result = await this.usersService.findByEmail(email);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    public async update(@Response() res, @Body() usersData: UsersData) {
        const result = await this.usersService.update(usersData.id, usersData);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('register')
    public async register(@Response() res, @Body() usersData: UsersData) {
        const result = await this.authService.register(usersData);
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.CREATED).json(result);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Response() res, @Body() login: LoginData) {
        const user = await this.usersService.findByEmail(login.email);
        if (!user) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'User Not Found',
            });
        } else {
            const token = this.authService.createToken(user);
            const user_response = user.response();
            let map = new Map();
            map['user'] = user_response;
            map['token'] = token;
            return res.status(HttpStatus.OK).json(map);
        }
    }
}

