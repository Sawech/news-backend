import { IsOptional, IsString } from 'class-validator';

export class CreateOpinionDto {
  @IsOptional()
  @IsString()
  pubName?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  linkUrl?: string;

  @IsOptional()
  @IsString()
  locale: string;
}

export class UpdateOpinionDto {
  @IsOptional()
  @IsString()
  pubName?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  linkUrl?: string;

  @IsOptional()
  @IsString()
  locale: string;
}

export class OpinionQueryDto {
  @IsOptional()
  @IsString()
  locale?: string;
}
