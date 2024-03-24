import { Controller, Get } from '@nestjs/common';
import { FindAllPermissaoService } from '../services/find-all-permissao.service';
import { ApiTags } from '@nestjs/swagger';
import { Permissao } from '../entities/permissao.entity';
import { AppResponse } from '@utils/app-response';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('permissoes')
@ApiTags('permissoes')
export class FindAllPermissaoController {
	constructor(
		private findAllPermissao: FindAllPermissaoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiPaginatedResponse(Permissao)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<Permissao[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { permissoes, count } = await this.findAllPermissao.execute(
			query,
		);

		return new AppResponse(permissoes, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
