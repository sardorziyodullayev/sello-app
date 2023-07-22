import { IsNotEmpty, IsString } from "class-validator";
import { SubcategoryCreateRequest } from "../interfaces";

export class SubcategoryCreateDto implements SubcategoryCreateRequest {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   categoryId: string;
}
