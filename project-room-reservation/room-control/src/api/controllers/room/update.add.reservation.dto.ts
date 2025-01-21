import {IsDateString, IsIn, IsNotEmpty, IsString, Length} from "class-validator";

export class UpdateAddReservationDto {
    @IsNotEmpty({ message: 'Reservation ID is required' })
    @IsString({ message: 'Reservation ID must be a string' })
    @Length(24, 24, { message: 'Reservation ID must have 24 characters' })
    reservationId: string

    @IsNotEmpty({ message: 'Start date is required' })
    @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
    from: string

    @IsNotEmpty({ message: 'End date is required' })
    @IsDateString({}, { message: 'End date must be a valid ISO date string' })
    to: string

    @IsString()
    @IsIn(['unconfirmed', 'confirmed', 'cancelled'])
    status: string;
}