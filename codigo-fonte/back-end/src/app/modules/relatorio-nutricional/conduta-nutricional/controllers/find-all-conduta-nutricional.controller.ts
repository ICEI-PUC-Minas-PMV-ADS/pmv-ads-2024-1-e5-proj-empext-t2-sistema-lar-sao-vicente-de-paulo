import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { CondutaNutricional } from '@prisma/client';
import { FindAllCondutaNutricionalService } from '../services/find-all-conduta-nutricional.service';

@ApiTags('conduta-nutricional')
@Controller('conduta-nutricional')
@ApiBearerAuth()
export class FindAllCondutaNutricionalController {
	constructor(
		private findAllCondutaNutricionalService: FindAllCondutaNutricionalService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Busca todas as Condutas Nutricionais',
	})
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<CondutaNutricional[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { condutasNutricionais, count } =
			await this.findAllCondutaNutricionalService.execute(query);

		return new AppResponse(condutasNutricionais, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
