import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ArticleQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  trending?: boolean;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  month?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  week?: boolean;

  @IsOptional()
  @IsString()
  locale?: string;
}

export class SearchQueryDto {
  @IsString()
  @MinLength(1)
  q: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  locale?: string;
}

export class AdminArticleQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED'])
  status?: 'DRAFT' | 'PUBLISHED';

  @IsOptional()
  @IsString()
  search?: string;
}

export class CreateArticleDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  slug: string;

  @IsString()
  @MinLength(10)
  excerpt: string;

  @IsString()
  @MinLength(10)
  body: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsString()
  authorId: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString({ each: true })
  tagIds?: string[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  trending?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  readTime?: number;

  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED'])
  status?: 'DRAFT' | 'PUBLISHED';

  @IsOptional()
  @IsString()
  locale?: string;
}

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  slug?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  excerpt?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  body?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString({ each: true })
  tagIds?: string[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  trending?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  readTime?: number;

  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED'])
  status?: 'DRAFT' | 'PUBLISHED';

  @IsOptional()
  @IsString()
  locale?: string;
}
