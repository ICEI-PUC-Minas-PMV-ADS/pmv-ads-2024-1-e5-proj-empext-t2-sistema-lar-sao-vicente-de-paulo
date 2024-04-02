import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { FindAllIdososService } from '../services/find-all-idoso.service';
import { Idoso } from '../entities/idoso.entity';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';

@ApiTags('idosos')
@Controller('idosos')
@ApiBearerAuth()
export class FindAllIdosoController {
	constructor(
		private findAllIdoso: FindAllIdososService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Retorna uma lista de todos os idosos' })
	@ApiPaginatedResponse(Idoso)
	@ApiQueryBuilder()
	@Roles(RoleIdoso.FIND)
	@ApiResponseError()
	async handle(): Promise<AppResponse<Idoso[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { idosos, count } = await this.findAllIdoso.execute(query);

		return new AppResponse(idosos, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
