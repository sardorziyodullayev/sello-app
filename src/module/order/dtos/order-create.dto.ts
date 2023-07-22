import { IsNotEmpty, IsString } from "class-validator";
import { OrderCreateRequest } from "../interfaces";

export class OrderCreateDto implements OrderCreateRequest {
   @IsString()
   @IsNotEmpty()
   productId: string;

   @IsString()
   @IsNotEmpty()
   userId: string;
}
