import {IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, Length, Min} from "class-validator";

export class CreateReservationDto {
    @IsNotEmpty({ message: 'Room ID is required' })
    @IsString({ message: 'Room ID must be a string' })
    @Length(24, 24, { message: 'Room ID must have 24 characters' })
    roomId: string

    @IsNotEmpty({ message: 'User ID is required' })
    @IsString({ message: 'User ID must be a string' })
    @Length(24, 24, { message: 'User ID must have 24 characters' })
    userId: string

    @IsNotEmpty({ message: 'Start date is required' })
    @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
    from: string

    @IsNotEmpty({ message: 'End date is required' })
    @IsDateString({}, { message: 'End date must be a valid ISO date string' })
    to: string

    @IsEnum(['confirmed', 'unconfirmed', 'cancelled'], { message: 'Status must be one of: confirmed, unconfirmed, cancelled' })
    status: 'confirmed' | 'unconfirmed' | 'cancelled'

    @IsNotEmpty({ message: 'Total price is required' })
    @IsNumber({}, { message: 'Total price must be a number' })
    @Min(0, { message: 'Total price must be at least 0' })
    totalPrice: number
}