import {IsString, IsNotEmpty, IsArray, IsNumber, Length} from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    capacity: number

    @IsArray()
    @IsNotEmpty()
    equipment: string[]

    @IsString()
    @IsNotEmpty()
    location: string

    @IsNumber()
    @IsNotEmpty()
    pricePerHour: number

    @IsString()
    @IsNotEmpty()
    @Length(24, 24, { message: 'Owner ID must have 24 characters' })
    ownerId: string
}