import type { Subcategory } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { SubcategoryService } from './subcategory.service';
import { SubcategoryUpdateDto, SubcategoryCreateDto } from './dtos';
import { Command } from './enums';

@Controller({
   path: 'subcategory-service/',
   version: '1'
})

export class SubcategoryController {
   constructor(
      private readonly service: SubcategoryService
   ) {
      this.service = service
   }

   @MessagePattern(Command.SUBCATEGORY_RETRIVE_ALL)
   async subcategoryRetriveAll(): Promise<Pick<Subcategory, 'id' | 'name' | 'categoryId'>[]> {
      return await this.service.subcategoryRetriveAll()
   }


   @MessagePattern(Command.SUBCATEGORY_CREATE)
   async createSubcategory(
      @Payload() payload: SubcategoryCreateDto
   ): Promise<SubcategoryCreateDto> {
      return await this.service.createSubcategory(payload)
   }

   @MessagePattern(Command.SUBCATEGORY_UPDATE)
   async updateSubcategory(
      @Payload() payload: SubcategoryUpdateDto
   ): Promise<SubcategoryUpdateDto> {
      return await this.service.updateSubcategory(payload)
   }

   @MessagePattern(Command.SUBCATEGORY_DELETE)
   async deleteSubcategory(
      @Payload('id', ParseUUIDPipe) id: string
   ): Promise<object> {
      return await this.service.deleteSubcategory({
         id
      })
   }
}  
                 