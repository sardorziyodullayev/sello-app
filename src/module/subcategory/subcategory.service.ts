import { Subcategory } from '@prisma/client';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '@prisma';
import type { SubcategoryCreateRequest, SubcategoryDeleteRequest, SubcategoryUpdateRequest } from './interfaces';

@Injectable()
export class SubcategoryService {
   private readonly prisma: PrismaService
   constructor(prisma: PrismaService) {
      this.prisma = prisma
   }

   async subcategoryRetriveAll(): Promise<Pick<Subcategory, 'id' | 'name' | 'categoryId'>[]> {
      return await this.prisma.subcategory.findMany({
         select: {
            id: true,
            name: true,
            categoryId: true
         }
      })
   }

   async createSubcategory(payload: SubcategoryCreateRequest): Promise<SubcategoryCreateRequest> {
      return await this.prisma.subcategory.create({
         data: {
            name: payload.name,
            categoryId: payload.categoryId
         }
      })
   }

   async updateSubcategory(payload: SubcategoryUpdateRequest): Promise<SubcategoryUpdateRequest> {
      await this.#_checkSubcategory(payload.id)
      return await this.prisma.subcategory.update({
         where: {
            id: payload.id
         },
         data: {
            name: payload.name,
            categoryId: payload.categoryId
         }
      })
   }

   async deleteSubcategory(payload: SubcategoryDeleteRequest): Promise<SubcategoryDeleteRequest> {
      await this.#_checkSubcategory(payload.id)
      return await this.prisma.subcategory.delete({
         where: {
            id: payload.id
         }
      })
   }


   async #_checkSubcategory(id: string) {
      const subcategory = await this.prisma.subcategory.findFirst({
         where: {
            id
         }
      })

      if (!subcategory) {
         throw new NotFoundException('Subcategory not found')
      }
   }

}
