import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import {PassportModule} from "@nestjs/passport";
import {User} from "./users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {AuthService} from "../services/auth.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret:  process.env.APP_JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    })],
  controllers: [UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService, AuthService, LocalStrategy, JwtStrategy]
})
export class UsersModule {}
