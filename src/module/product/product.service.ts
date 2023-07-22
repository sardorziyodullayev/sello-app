import { Product } from '@prisma/client';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '@prisma';
import type { ProductCreateRequest, ProductDeleteRequest, ProductUpdateRequest } from './interfaces';

@Injectable()
export class ProductService {
   private readonly prisma: PrismaService
   constructor(prisma: PrismaService) {
      this.prisma = prisma
   }

   async productRetriveAll(): Promise<Pick<Product, 'id' | 'title' | 'price' | 'discounted' | 'subcategoryId'>[]> {
      return await this.prisma.product.findMany({
         select: {
            id: true,
            title: true,
            price: true,
            discounted: true,
            subcategoryId: true
         }
      })
   }

   async createProduct(payload: ProductCreateRequest): Promise<ProductCreateRequest> {
      return await this.prisma.product.create({
         data: {
            title: payload.title,
            price: payload.price,
            discounted: payload.discounted,
            subcategoryId: payload.subcategoryId
         }
      })
   }

   async updateProduct(payload: ProductUpdateRequest): Promise<ProductUpdateRequest> {
      await this.#_checkProduct(payload.id)
      return await this.prisma.product.update({
         where: {
            id: payload.id
         },
         data: {
            title: payload.title,
            price: payload.price,
            discounted: payload.discounted,
            subcategoryId: payload.subcategoryId
         }
      })
   }

   async deleteProduct(payload: ProductDeleteRequest): Promise<ProductDeleteRequest> {
      await this.#_checkProduct(payload.id)
      return await this.prisma.product.delete({
         where: {
            id: payload.id
         }
      })
   }

   async getDiscountedProducts(): Promise<Pick<Product, 'id' | 'title' | 'price' | 'discounted' | 'subcategoryId'>[]> {
      return await this.prisma.product.findMany({
         select: {
            id: true,
            title: true,
            price: true,
            discounted: true,
            subcategoryId: true
         },
         where: {
            discounted: true
         }
      });
   }

   async #_checkProduct(id: string) {
      const product = await this.prisma.product.findFirst({
         where: {
            id
         }
      })

      if (!product) {
         throw new NotFoundException('Product not found')
      }
   }

}
