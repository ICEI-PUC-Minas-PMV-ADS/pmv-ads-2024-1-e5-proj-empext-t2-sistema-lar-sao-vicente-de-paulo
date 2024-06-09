import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { QuadroClinico } from '@prisma/client';
import { FindAllQuadroClinicoService } from '../services/find-all-quadro-clinico.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('quadro-clinico')
@Controller('quadro-clinico')
@ApiBearerAuth()
export class FindAllQuadroClinicoController {
	constructor(
		private findAllQuadroClinicoService: FindAllQuadroClinicoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({
		summary: 'Busca todos os Quadros Clínicos',
	})
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<QuadroClinico[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { quadrosClinicos, count } =
			await this.findAllQuadroClinicoService.execute(query);

		return new AppResponse(quadrosClinicos, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
