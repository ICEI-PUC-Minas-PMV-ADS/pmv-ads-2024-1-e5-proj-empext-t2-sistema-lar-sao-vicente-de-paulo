import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { SemiologiaNutricional } from '@prisma/client';
import { FindAllSemiologiaNutricionalService } from '../services/find-all-semiologia-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('semiologia-nutricional')
@Controller('semiologia-nutricional')
@ApiBearerAuth()
export class FindAllSemiologiaNutricionalController {
	constructor(
		private findAllSemiologiaNutricionalService: FindAllSemiologiaNutricionalService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({
		summary: 'Busca todas as Semiologias Nutricionais',
	})
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<SemiologiaNutricional[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { semiologiasNutricionais, count } =
			await this.findAllSemiologiaNutricionalService.execute(query);

		return new AppResponse(semiologiasNutricionais, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
