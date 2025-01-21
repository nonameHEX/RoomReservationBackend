import {IsNotEmpty, IsString} from "class-validator";

export class NotificationDto {
    @IsNotEmpty({ message: 'Message is required' })
    @IsString({ message: 'Message must be a string' })
    message: string;
}