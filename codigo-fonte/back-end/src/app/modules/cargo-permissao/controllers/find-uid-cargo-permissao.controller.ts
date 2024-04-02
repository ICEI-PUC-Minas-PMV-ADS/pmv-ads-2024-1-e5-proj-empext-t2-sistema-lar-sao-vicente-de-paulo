import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@utils/app-response';
import { FindUidCargoPermissaoService } from '../services/find-uid-cargo-permissao.service';
import { CargoPermissao } from '../entities/modelo-cargo-permissao.entity';
import { ApiFindResponse } from '@/common/decorators/api-find-response.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargo-permissoes')
@ApiTags('cargo-permissoes')
@ApiBearerAuth()
export class FindUidCargoPermissaoController {
	constructor(private findUidCargoPermissao: FindUidCargoPermissaoService) {}

	@Get(':uid')
	@ApiFindResponse(CargoPermissao)
	@Roles(RoleCargo.FIND)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<CargoPermissao | null>> {
		const cargoPermissao = await this.findUidCargoPermissao.execute(uid);

		return new AppResponse(cargoPermissao);
	}
}
