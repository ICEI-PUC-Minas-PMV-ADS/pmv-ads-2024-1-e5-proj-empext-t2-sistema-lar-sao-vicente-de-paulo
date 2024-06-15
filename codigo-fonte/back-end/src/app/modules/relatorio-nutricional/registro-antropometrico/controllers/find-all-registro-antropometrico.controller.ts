import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { AntropometriaNutricional } from '@prisma/client';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';
import { FindAllRegistroAntropometricoService } from '../services/find-all-registro-antropometrico.service';

@ApiTags('registro-antropometrico')
@Controller('registro-antropometrico')
@ApiBearerAuth()
export class FindAllRegistroAntropometricoController {
	constructor(
		private findAllRegistroAntropometricoService: FindAllRegistroAntropometricoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({
		summary:
			'Busca todas os Registro Antropométrico cadastradas no sistema',
	})
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<AntropometriaNutricional[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { antropometrias, count } =
			await this.findAllRegistroAntropometricoService.execute(query);

		return new AppResponse(antropometrias, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
