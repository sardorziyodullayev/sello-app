import { IsNotEmpty, IsString } from "class-validator";
import { SubcategoryUpdateRequest } from "../interfaces";

export class SubcategoryUpdateDto implements SubcategoryUpdateRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;
}
