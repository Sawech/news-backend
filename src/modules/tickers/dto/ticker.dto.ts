import { IsString, MinLength } from 'class-validator';

export class CreateTickerDto {
  @IsString()
  @MinLength(2)
  content: string;
}

export class UpdateTickerDto {
  @IsString()
  @MinLength(2)
  content: string;
}
