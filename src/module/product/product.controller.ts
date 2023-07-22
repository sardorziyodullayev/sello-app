import type { Product } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { ProductService } from './product.service';
import { ProductUpdateDto, ProductCreateDto } from './dtos';
import { Command } from './enums';

@Controller({
   path: 'product-service/',
   version: '1'
})

export class ProductController {
   constructor(
      private readonly service: ProductService
   ) {
      this.service = service
   }

   @MessagePattern(Command.PRODUCT_RETRIVE_ALL)
   async productRetriveAll(): Promise<Pick<Product, 'id' | 'title' | 'price' | 'discounted' | 'subcategoryId'>[]> {
      return await this.service.productRetriveAll()
   }


   @MessagePattern(Command.PRODUCT_CREATE)
   async createProduct(
      @Payload() payload: ProductCreateDto
   ): Promise<ProductCreateDto> {
      return await this.service.createProduct(payload)
   }

   @MessagePattern(Command.PRODUCT_UPDATE)
   async updateProduct(
      @Payload() payload: ProductUpdateDto
   ): Promise<ProductUpdateDto> {
      return await this.service.updateProduct(payload)
   }

   @MessagePattern(Command.PRODUCT_DELETE)
   async deleteProduct(
      @Payload('id', ParseUUIDPipe) id: string
   ): Promise<object> {
      return await this.service.deleteProduct({
         id
      })
   }

   @MessagePattern(Command.PRODUCT_RETRIVE_ALL_DISCOUNTED)
   async getDiscountedProducts(): Promise<Pick<Product, 'id' | 'title' | 'price' | 'discounted' | 'subcategoryId'>[]> {
      return await this.service.getDiscountedProducts();
   }
}
