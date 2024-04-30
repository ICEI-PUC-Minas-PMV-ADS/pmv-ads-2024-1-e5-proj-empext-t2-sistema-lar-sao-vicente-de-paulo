import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllModeloRelatorioPiaOpcaoService } from '../services/find-all-modelo-relatorio-pia-opcao.service';
import { ModeloRelatorioPiaRespostaOpcao } from '../entities/modelo-relatorio-pia-opcao';

@ApiTags('modelo-relatorio-pia-resposta-opcao')
@Controller('modelo-relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class FindAllModeloRelatorioPiaOpcaoController {
	constructor(
		private findAllModeloRelatorioPiaOpcaoService: FindAllModeloRelatorioPiaOpcaoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Lista todos os modelos de opção de resposta com paginação' })
	@ApiPaginatedResponse(ModeloRelatorioPiaRespostaOpcao)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<ModeloRelatorioPiaRespostaOpcao[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { modelosRelatoriosPiasOpcaos, count } = await this.findAllModeloRelatorioPiaOpcaoService.execute(query);

		return new AppResponse(modelosRelatoriosPiasOpcaos, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
