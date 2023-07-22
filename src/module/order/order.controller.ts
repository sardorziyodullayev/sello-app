import type { Order } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseUUIDPipe, } from "@nestjs/common";
import { OrderService } from './order.service';
import { OrderUpdateDto, OrderCreateDto } from './dtos';
import { Command } from './enums';

@Controller({
   path: 'order-service/',
   version: '1'
})

export class OrderController {
   constructor(
      private readonly service: OrderService
   ) {
      this.service = service
   }

   @MessagePattern(Command.ORDER_RETRIVE_ALL)
   async orderRetriveAll(): Promise<Pick<Order, 'id' | 'productId' | 'userId'>[]> {
      return await this.service.orderRetriveAll()
   }


   @MessagePattern(Command.ORDER_CREATE)
   async createOrder(
      @Payload() payload: OrderCreateDto
   ): Promise<OrderCreateDto> {
      return await this.service.createOrder(payload)
   }

   @MessagePattern(Command.ORDER_UPDATE)
   async updateOrder(
      @Payload() payload: OrderUpdateDto
   ): Promise<OrderUpdateDto> {
      return await this.service.updateOrder(payload)
   }

   @MessagePattern(Command.ORDER_DELETE)
   async deleteOrder(
      @Payload('id', ParseUUIDPipe) id: string
   ): Promise<object> {
      return await this.service.deleteOrder({
         id
      })
   }
}
