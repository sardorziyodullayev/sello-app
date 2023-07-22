import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductCreateRequest } from "../interfaces";

export class ProductCreateDto implements ProductCreateRequest {
   @IsString()
   @IsNotEmpty()
   title: string;

   @IsNumber()
   @IsNotEmpty()
   price: number;

   @IsBoolean()
   discounted?: boolean;

   @IsString()
   @IsNotEmpty()
   subcategoryId: string;
}
