import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductUpdateRequest } from "../interfaces";

export class ProductUpdateDto implements ProductUpdateRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

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
