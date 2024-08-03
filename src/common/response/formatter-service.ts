import { HttpStatus } from '@nestjs/common';
import { IBaseResponse } from '../interfaces/base-response.interface';
import { HttpMessages } from '../enums/http-messages.enum';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dtos/pagination.dto';
import { IPaginationResponse } from '../interfaces/pagination-response.interface';

export class ResponseFormatter {
  standartResponse<T>(
		data: T,
		statusCode: HttpStatus,
		message: HttpMessages,
	): IBaseResponse<T> {
		return {
			statusCode,
			message,
			data,
		};
	}

	async paginate<T>(
		queryBuilder: SelectQueryBuilder<T>,
		paginationDto: PaginationDto,
		statusCode: HttpStatus,
    message: HttpMessages,
	): Promise<IPaginationResponse<T>> {
		const { page = 1, limit = 10 } = paginationDto;
		const [data, total] = await queryBuilder
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount();

		return {
			data,
			total,
			page,
			limit,
      statusCode,
      message,
		};
	}
}
