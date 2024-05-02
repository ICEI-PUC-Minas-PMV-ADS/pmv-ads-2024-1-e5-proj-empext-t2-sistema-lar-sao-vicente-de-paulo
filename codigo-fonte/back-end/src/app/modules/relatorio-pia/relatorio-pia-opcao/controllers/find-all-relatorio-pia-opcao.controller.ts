import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllRelatorioPiaOpcaoService } from '../services/find-all-relatorio-pia-opcao.service';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';

@ApiTags('relatorio-pia-resposta-opcao')
@Controller('relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class FindAllRelatorioPiaOpcaoController {
	constructor(
		private findAllRelatorioPiaOpcaoService: FindAllRelatorioPiaOpcaoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Lista todos os relatório PIA Resposta Opção com paginação',
	})
	@ApiPaginatedResponse(RelatorioPiaRespostaOpcao)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<RelatorioPiaRespostaOpcao[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { RelatoriosPiasOpcaos, count } =
			await this.findAllRelatorioPiaOpcaoService.execute(query);

		return new AppResponse(RelatoriosPiasOpcaos, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
