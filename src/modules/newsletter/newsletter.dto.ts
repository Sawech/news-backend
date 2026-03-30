import { IsEmail } from 'class-validator';

export class SubscribeNewsletterDto {
  @IsEmail({}, { message: 'Must be a valid email address' })
  email: string;
}
