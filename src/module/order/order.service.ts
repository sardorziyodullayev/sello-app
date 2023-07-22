import { Order } from '@prisma/client';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '@prisma';
import type { OrderCreateRequest, OrderDeleteRequest, OrderUpdateRequest } from './interfaces';

@Injectable()
export class OrderService {
   private readonly prisma: PrismaService
   constructor(prisma: PrismaService) {
      this.prisma = prisma
   }

   async orderRetriveAll(): Promise<Pick<Order, 'id' | 'productId' | 'userId'>[]> {
      return await this.prisma.order.findMany({
         select: {
            id: true,
            productId: true,
            userId: true
         }
      })
   }

   async createOrder(payload: OrderCreateRequest): Promise<OrderCreateRequest> {
      return await this.prisma.order.create({
         data: {
            productId: payload.productId,
            userId: payload.userId,
         }
      })
   }

   async updateOrder(payload: OrderUpdateRequest): Promise<OrderUpdateRequest> {
      await this.#_checkOrder(payload.id)
      return await this.prisma.order.update({
         where: {
            id: payload.id
         },
         data: {
            productId: payload.productId,
            userId: payload.userId
         }
      })
   }

   async deleteOrder(payload: OrderDeleteRequest): Promise<OrderDeleteRequest> {
      await this.#_checkOrder(payload.id)
      return await this.prisma.order.delete({
         where: {
            id: payload.id
         }
      })
   }

   async #_checkOrder(id: string) {
      const order = await this.prisma.order.findFirst({
         where: {
            id
         }
      })

      if (!order) {
         throw new NotFoundException('Order not found')
      }
   }

}
