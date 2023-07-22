import { PrismaService } from '@prisma';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Module } from "@nestjs/common";

@Module({
   providers: [PrismaService, OrderService],
   controllers: [OrderController]
})

export class OrderModule { }
