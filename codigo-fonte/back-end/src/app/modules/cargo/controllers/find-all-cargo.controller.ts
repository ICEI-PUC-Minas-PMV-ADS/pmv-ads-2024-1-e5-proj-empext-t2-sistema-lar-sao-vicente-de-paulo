import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@utils/app-response';
import { FindAllCargoService } from '../services/find-all-cargo.service';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { Cargo } from '../entities/cargo.entity';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargos')
@ApiTags('cargos')
export class FindAllCargoController {
	constructor(
		private findAllCargo: FindAllCargoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiPaginatedResponse(Cargo)
	@ApiQueryBuilder()
	@ApiResponseError()
	async handle(): Promise<AppResponse<Cargo[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { cargos, count } = await this.findAllCargo.execute(query);

		return new AppResponse(cargos, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
