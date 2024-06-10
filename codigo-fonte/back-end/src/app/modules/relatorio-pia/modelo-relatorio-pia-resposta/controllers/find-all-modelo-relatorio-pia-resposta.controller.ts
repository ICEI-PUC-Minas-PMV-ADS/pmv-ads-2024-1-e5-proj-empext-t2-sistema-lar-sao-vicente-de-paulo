import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllModeloRelatorioPiaRespostaService } from '../services/find-all-modelo-relatorio-pia-resposta.service';
import { ModeloRelatorioPiaResposta } from '../entities/modelo-relatorio-pia-resposta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-resposta')
@Controller('modelo-relatorio-pia-resposta')
@ApiBearerAuth()
export class FindAllModeloRelatorioPiaRespostaController {
	constructor(
		private findAllModeloRelatorioPiaRespostaService: FindAllModeloRelatorioPiaRespostaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleModeloRelatorioPia.FIND)
	@ApiOperation({
		summary: 'Lista todos os modelos de resposta com paginação',
	})
	@ApiPaginatedResponse(ModeloRelatorioPiaResposta)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<ModeloRelatorioPiaResposta[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { modelosRelatoriosPiasRespostas, count } =
			await this.findAllModeloRelatorioPiaRespostaService.execute(query);

		return new AppResponse(modelosRelatoriosPiasRespostas, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
