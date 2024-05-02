import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllRelatorioPiaPerguntaService } from '../services/find-all-relatorio-pia-pergunta.service';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class FindAllRelatorioPiaPerguntaController {
	constructor(
		private findAllRelatorioPiaPerguntaService: FindAllRelatorioPiaPerguntaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Lista todos os relatório PIA Pergunta com paginação',
	})
	@ApiPaginatedResponse(RelatorioPiaPergunta)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<RelatorioPiaPergunta[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { RelatoriosPiasPerguntas, count } =
			await this.findAllRelatorioPiaPerguntaService.execute(query);

		return new AppResponse(RelatoriosPiasPerguntas, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
