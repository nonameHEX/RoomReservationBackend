import { IsString, IsOptional, IsArray, IsNumber } from "class-validator";

export class UpdateRoomDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsNumber()
    @IsOptional()
    capacity?: number

    @IsArray()
    @IsOptional()
    equipment?: string[]

    @IsString()
    @IsOptional()
    location?: string

    @IsNumber()
    @IsOptional()
    pricePerHour?: number
}