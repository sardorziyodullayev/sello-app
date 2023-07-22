import { Category } from '@prisma/client';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '@prisma';
import type { CategoryCreateRequest, CategoryDeleteRequest, CategoryUpdateRequest } from './interfaces';

@Injectable()
export class CategoryService {
   private readonly prisma: PrismaService
   constructor(prisma: PrismaService) {
      this.prisma = prisma
   }

   async categoryRetriveAll(): Promise<Pick<Category, 'id' | 'name'>[]> {
      return await this.prisma.category.findMany({
         select: {
            id: true,
            name: true
         }
      })
   }

   async createCategory(payload: CategoryCreateRequest): Promise<CategoryCreateRequest> {
      return await this.prisma.category.create({
         data: {
            name: payload.name,
         }
      })
   }

   async updateCategory(payload: CategoryUpdateRequest): Promise<CategoryUpdateRequest> {
      await this.#_checkCategory(payload.id)
      return await this.prisma.category.update({
         where: {
            id: payload.id
         },
         data: {
            name: payload.name,
         }
      })
   }

   async deleteCategory(payload: CategoryDeleteRequest): Promise<CategoryDeleteRequest> {
      await this.#_checkCategory(payload.id)
      return await this.prisma.category.delete({
         where: {
            id: payload.id
         }
      })
   }


   async #_checkCategory(id: string) {
      const category = await this.prisma.category.findFirst({
         where: {
            id
         }
      })

      if (!category) {
         throw new NotFoundException('Category not found')
      }
   }

}
