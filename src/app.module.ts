import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, AuthService, OrdersService],
})
export class AppModule {}
