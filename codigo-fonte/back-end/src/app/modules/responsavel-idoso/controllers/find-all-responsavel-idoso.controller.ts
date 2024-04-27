import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllResponsavelIdosoService } from '../services/find-all-responsavel-idoso.service';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ResponsavelIdoso } from '../entities/responsavel-idoso.entity';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { AppResponse } from '@utils/app-response';

@ApiTags('idosos/responsaveis')
@Controller('idosos/responsaveis')
@ApiBearerAuth()
export class FindAllResponsavelIdosoController {
	constructor(
		private findAllResponsavelIdoso: FindAllResponsavelIdosoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Retorna uma lista de todos os responsável' })
	@ApiPaginatedResponse(ResponsavelIdoso)
	@ApiQueryBuilder()
	@Roles(RoleIdoso.FIND)
	@ApiResponseError()
	async handle(): Promise<AppResponse<ResponsavelIdoso[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { responsaveisIdoso, count } =
			await this.findAllResponsavelIdoso.execute(query);

		return new AppResponse(responsaveisIdoso, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
