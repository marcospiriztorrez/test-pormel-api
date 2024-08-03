import { IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
	@IsOptional()
	@IsString()
	search: string;

	@IsOptional()
	@Type(() => Number)
	@IsPositive()
	page?: number;

	@IsOptional()
	@Type(() => Number)
	@IsPositive()
	@Min(1)
	limit?: number;
}
