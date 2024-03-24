import { Controller, Get } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiQuery,
	ApiTags,
	ApiOperation,
} from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { FindAllIdososService } from '../services/find-all-idoso.service';
import { Idoso } from '../entities/idoso.entity';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { QueryValidator } from '@/core/providers/query-builder/dto/queryValidator.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';

@ApiTags('idosos')
@Controller('idosos')
export class FindAllIdosoController {
	constructor(
		private findAllIdoso: FindAllIdososService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Retorna uma lista de todos os idosos' })
	@ApiPaginatedResponse(Idoso)
	@ApiQueryBuilder()
	@ApiResponseError()
	@ApiResponseError()
	async handle(): Promise<AppResponse<Idoso[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { idosos, count } = await this.findAllIdoso.execute(query);

		return new AppResponse(idosos, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
