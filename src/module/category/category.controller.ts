import type { Category } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { CategoryService } from './category.service';
import { CategoryUpdateDto, CategoryCreateDto } from './dtos';
import { Command } from './enums';

@Controller({
   path: 'category-service/',
   version: '1'
})

export class CategoryController {
   constructor(
      private readonly service: CategoryService
   ) {
      this.service = service
   }

   @MessagePattern(Command.CATEGORY_RETRIVE_ALL)
   async categoryRetriveAll(): Promise<Pick<Category, 'id' | 'name'>[]> {
      return await this.service.categoryRetriveAll()
   }


   @MessagePattern(Command.CATEGORY_CREATE)
   async createCategory(
      @Payload() payload: CategoryCreateDto
   ): Promise<CategoryCreateDto> {
      return await this.service.createCategory(payload)
   }

   @MessagePattern(Command.CATEGORY_UPDATE)
   async updateCategory(
      @Payload() payload: CategoryUpdateDto
   ): Promise<CategoryUpdateDto> {
      return await this.service.updateCategory(payload)
   }

   @MessagePattern(Command.CATEGORY_DELETE)
   async deleteCategory(
      @Payload('id', ParseUUIDPipe) id: string
   ): Promise<object> {
      return await this.service.deleteCategory({
         id
      })
   }
}  
                 