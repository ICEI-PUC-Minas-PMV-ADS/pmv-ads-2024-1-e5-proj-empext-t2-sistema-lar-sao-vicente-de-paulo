import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllModeloRelatorioPiaPerguntaService } from '../services/find-all-modelo-relatorio-pia-pergunta.service';
import { ModeloRelatorioPiaPergunta } from '../entities/modelo-relatorio-pia-pergunta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-pergunta')
@Controller('modelo-relatorio-pia-pergunta')
@ApiBearerAuth()
export class FindAllModeloRelatorioPiaPerguntaController {
	constructor(
		private findAllModeloRelatorioPiaPerguntaService: FindAllModeloRelatorioPiaPerguntaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleModeloRelatorioPia.FIND)
	@ApiOperation({
		summary: 'Lista todos os modelos de pergunta com paginação',
	})
	@ApiPaginatedResponse(ModeloRelatorioPiaPergunta)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<ModeloRelatorioPiaPergunta[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { modelosRelatoriosPiasPerguntas, count } =
			await this.findAllModeloRelatorioPiaPerguntaService.execute(query);

		return new AppResponse(modelosRelatoriosPiasPerguntas, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
