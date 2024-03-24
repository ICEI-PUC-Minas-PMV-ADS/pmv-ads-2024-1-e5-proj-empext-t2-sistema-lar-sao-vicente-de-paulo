import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@utils/app-response';
import { FindAllCargoPermissaoService } from '../services/find-all-cargo-permissao.service';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { CargoPermissao } from '../entities/modelo-cargo-permissao.entity';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { ApiQueryBuilder } from '@/common/decorators/api-query-builder.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
@ApiBearerAuth()
export class FindAllCargoPermissaoController {
	constructor(
		private findAllCargoPermissao: FindAllCargoPermissaoService,
		private queryBuilder: QueryBuilderService,
	) {}

	@Get()
	@ApiPaginatedResponse(CargoPermissao)
	@ApiQueryBuilder()
	@Roles(RoleCargo.FIND)
	@ApiResponseError()
	async handle(): Promise<AppResponse<CargoPermissao[]>> {
		const { page_limit, page_number, ...query } =
			await this.queryBuilder.query();

		const { cargoPermissoes, count } =
			await this.findAllCargoPermissao.execute(query);

		return new AppResponse(cargoPermissoes, {
			page_limit,
			page_number,
			total_count: count,
		});
	}
}
