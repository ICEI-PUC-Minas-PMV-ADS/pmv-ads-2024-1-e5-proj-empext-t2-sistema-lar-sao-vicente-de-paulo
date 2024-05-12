import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllRelatorioPiaService } from '../services/find-all-relatorio-pia.service';
import { RelatorioPia } from '../entities/relatorio-pia.entity';

@ApiTags('relatorio-pia')
@Controller('relatorio-pia')
@ApiBearerAuth()
export class FindAllRelatorioPiaController {
	constructor(
		private findAllRelatorioPiaService: FindAllRelatorioPiaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Lista todos os Relatório PIA com paginação',
	})
	@ApiPaginatedResponse(RelatorioPia)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<RelatorioPia[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { relatoriosPias, count } =
			await this.findAllRelatorioPiaService.execute(query);

		return new AppResponse(relatoriosPias, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
