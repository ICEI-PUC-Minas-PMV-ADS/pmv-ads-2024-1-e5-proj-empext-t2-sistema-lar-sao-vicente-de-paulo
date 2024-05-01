import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllModeloRelatorioPiaService } from '../services/find-all-modelo-relatorio-pia.service';
import { ModeloRelatorioPia } from '../entities/modelo-relatorio-pia.entity';

@ApiTags('modelo-relatorio-pia')
@Controller('modelo-relatorio-pia')
@ApiBearerAuth()
export class FindAllModeloRelatorioPiaController {
	constructor(
		private findAllModeloRelatorioService: FindAllModeloRelatorioPiaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Lista todos os modelos de relatório PIA com paginação' })
	@ApiPaginatedResponse(ModeloRelatorioPia)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<ModeloRelatorioPia[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { modelosRelatoriosPias, count } = await this.findAllModeloRelatorioService.execute(query);

		return new AppResponse(modelosRelatoriosPias, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
