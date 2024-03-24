import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllUsuarioService } from '../services/find-all-usuario.service';
import { AppResponse } from '@/common/utils/app-response';
import { Usuario } from '../entities/usuario.entity';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';

@ApiTags('usuarios')
@Controller('usuarios')
export class FindAllUsuarioController {
	constructor(
		private findAllUsuario: FindAllUsuarioService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Lista todos os usuários com paginação' })
	@ApiPaginatedResponse(Usuario)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<Usuario[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { usuarios, count } = await this.findAllUsuario.execute(query);

		return new AppResponse(usuarios, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
