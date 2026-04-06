import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
