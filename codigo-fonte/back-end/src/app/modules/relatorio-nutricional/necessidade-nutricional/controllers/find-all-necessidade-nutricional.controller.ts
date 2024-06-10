import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { NecessidadeNutricional } from '@prisma/client';
import { FindAllNecessidadeNutricionalService } from '../services/find-all-necessidade-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('necessidade-nutricional')
@Controller('necessidade-nutricional')
@ApiBearerAuth()
export class FindAllNecessidadeNutricionalController {
	constructor(
		private findAllNecessidadeNutricionalService: FindAllNecessidadeNutricionalService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({
		summary: 'Busca todas as Necessidades Nutricionais',
	})
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<NecessidadeNutricional[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { necessidadesNutricionais, count } =
			await this.findAllNecessidadeNutricionalService.execute(query);

		return new AppResponse(necessidadesNutricionais, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
