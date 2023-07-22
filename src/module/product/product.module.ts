import { PrismaService } from '@prisma';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Module } from "@nestjs/common";


@Module({
   providers: [PrismaService, ProductService],
   controllers: [ProductController]
})

export class ProductModule { }
