import { PrismaService } from '@prisma';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { Module } from "@nestjs/common";


@Module({
   providers: [PrismaService, SubcategoryService],
   controllers: [SubcategoryController]
})

export class SubcategoryModule { }
