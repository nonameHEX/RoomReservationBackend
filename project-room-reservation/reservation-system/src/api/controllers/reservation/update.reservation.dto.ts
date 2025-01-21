import {IsDateString, IsEnum, IsNumber, Min} from "class-validator";

export class UpdateReservationDto {
    @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
    from?: string

    @IsDateString({}, { message: 'End date must be a valid ISO date string' })
    to?: string

    @IsEnum(['confirmed', 'unconfirmed', 'cancelled'], { message: 'Status must be one of: confirmed, unconfirmed, cancelled' })
    status?: 'confirmed' | 'unconfirmed' | 'cancelled'

    @IsNumber({}, { message: 'Total price must be a number' })
    @Min(0, { message: 'Total price must be at least 0' })
    totalPrice?: number
}