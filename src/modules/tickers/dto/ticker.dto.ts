import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTickerDto {
  @IsString()
  @MinLength(2)
  content: string;

  @IsOptional()
  @IsString()
  locale: string;
}

export class UpdateTickerDto {
  @IsString()
  @MinLength(2)
  content: string;

  @IsOptional()
  @IsString()
  locale: string;
}

export class TickerQueryDto {
  @IsOptional()
  @IsString()
  locale?: string;
}
