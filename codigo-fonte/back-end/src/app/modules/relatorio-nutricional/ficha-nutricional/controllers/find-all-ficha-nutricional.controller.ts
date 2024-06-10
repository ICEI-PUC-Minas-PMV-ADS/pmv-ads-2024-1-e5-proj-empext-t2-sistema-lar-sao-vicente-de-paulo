import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FichaNutricional } from '@prisma/client';
import { FindAllFichaNutricionalService } from '../services/find-all-ficha-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('ficha-nutricional')
@Controller('ficha-nutricional')
@ApiBearerAuth()
export class FindAllFichaNutricionalController {
	constructor(
		private findAllFichaNutricionalService: FindAllFichaNutricionalService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({
		summary: 'Busca todas as Fichas Nutricionais',
	})
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<FichaNutricional[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { fichasNutricionais, count } =
			await this.findAllFichaNutricionalService.execute(query);

		return new AppResponse(fichasNutricionais, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
