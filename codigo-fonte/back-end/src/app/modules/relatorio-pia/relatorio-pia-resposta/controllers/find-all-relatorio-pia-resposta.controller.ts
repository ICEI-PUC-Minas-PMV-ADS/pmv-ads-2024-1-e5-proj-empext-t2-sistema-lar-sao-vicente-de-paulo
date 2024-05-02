import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllRelatorioPiaRespostaService } from '../services/find-all-relatorio-pia-resposta.service';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';

@ApiTags('relatorio-pia-resposta')
@Controller('relatorio-pia-resposta')
@ApiBearerAuth()
export class FindAllRelatorioPiaRespostaController {
	constructor(
		private findAllRelatorioPiaRespostaService: FindAllRelatorioPiaRespostaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Lista todos os relatório PIA Resposta com paginação',
	})
	@ApiPaginatedResponse(RelatorioPiaResposta)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<RelatorioPiaResposta[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { RelatoriosPiasRespostas, count } =
			await this.findAllRelatorioPiaRespostaService.execute(query);

		return new AppResponse(RelatoriosPiasRespostas, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
