import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { AntropometriaNutricional } from '@prisma/client';
import { FindAllAntropometriaService } from '../services/find-all-antropometria.service';

@ApiTags('antropometria')
@Controller('antropometria')
@ApiBearerAuth()
export class FindAllAntropometriaController {
	constructor(
		private findAllAntropometriaService: FindAllAntropometriaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Busca todas as Antropometrias cadastradas no sistema',
	})
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<AntropometriaNutricional[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { antropometrias, count } =
			await this.findAllAntropometriaService.execute(query);

		return new AppResponse(antropometrias, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
