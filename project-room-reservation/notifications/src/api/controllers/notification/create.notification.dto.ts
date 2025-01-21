import {IsDateString, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateNotificationDto {
    @IsNotEmpty({ message: 'User ID is required' })
    @IsString({ message: 'User ID must be a string' })
    @Length(24, 24, { message: 'User ID must have 24 characters' })
    userId: string

    @IsNotEmpty({ message: 'Message is required' })
    @IsString({ message: 'Message must be a string' })
    message: string
}