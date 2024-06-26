import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { FindAllRelatorioPiaRespostaDefinidaService } from '../services/find-all-relatorio-pia-resposta-definida.service';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-resposta-definida')
@Controller('relatorio-pia-resposta-definida')
@ApiBearerAuth()
export class FindAllRelatorioPiaRespostaDefinidaController {
	constructor(
		private findAllRelatorioPiaRespostaDefinidaService: FindAllRelatorioPiaRespostaDefinidaService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@Roles(RoleRelatorioPia.FIND)
	@ApiOperation({
		summary: 'Lista todos os Relatório PIA Resposta Definida com paginação',
	})
	@ApiPaginatedResponse(RelatorioPiaRespostaDefinida)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<RelatorioPiaRespostaDefinida[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { relatoriosPiasRespostaDefinidas, count } =
			await this.findAllRelatorioPiaRespostaDefinidaService.execute(
				query,
			);

		return new AppResponse(relatoriosPiasRespostaDefinidas, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
