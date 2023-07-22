import { PrismaService } from '@prisma';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Module } from "@nestjs/common";


@Module({
   providers: [PrismaService, CategoryService],
   controllers: [CategoryController]
})

export class CategoryModule { }
