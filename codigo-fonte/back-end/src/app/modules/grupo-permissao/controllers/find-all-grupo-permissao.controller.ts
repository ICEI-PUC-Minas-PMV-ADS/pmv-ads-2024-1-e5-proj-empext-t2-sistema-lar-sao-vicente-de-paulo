import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllGrupoPermissaoService } from '../services/find-all-grupo-permissao.service';
import { GrupoPermissao } from '../entities/grupo-permissao.entity';
import { AppResponse } from '@utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('grupo-permissoes')
@ApiTags('grupo-permissoes')
export class FindAllGrupoPermissaoController {
	constructor(
		private findAllGrupoPermissao: FindAllGrupoPermissaoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiPaginatedResponse(GrupoPermissao)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<GrupoPermissao[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { grupoPermissoes, count } =
			await this.findAllGrupoPermissao.execute(query);

		return new AppResponse(grupoPermissoes, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
