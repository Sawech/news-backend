import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  locale: string;
}

export class TagQueryDto {
  @IsOptional()
  @IsString()
  locale?: string;
}
