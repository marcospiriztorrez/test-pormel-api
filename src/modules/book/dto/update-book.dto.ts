import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;
  
  @IsString()
  @IsOptional()
  isbn?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsNumber()
  @IsOptional()
  pages?: number;

  @IsString()
  @IsOptional()
  publisherId?: string;
  
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  authorsIds?: string[];
}
