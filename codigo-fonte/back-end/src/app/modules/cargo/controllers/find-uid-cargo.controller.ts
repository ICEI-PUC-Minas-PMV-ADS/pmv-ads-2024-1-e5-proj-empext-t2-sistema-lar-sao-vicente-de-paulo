import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@utils/app-response';
import { Cargo } from '../entities/cargo.entity';
import { FindUidCargoService } from '../services/find-uid-cargo.service';
import { ApiFindResponse } from '@/common/decorators/api-find-response.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargos')
@ApiTags('cargos')
@ApiBearerAuth()
export class FindUidCargoController {
	constructor(private findUidCargo: FindUidCargoService) {}

	@Get(':uid')
	@ApiFindResponse(Cargo)
	@Roles(RoleCargo.FIND)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<Cargo | null>> {
		const cargos = await this.findUidCargo.execute(uid);

		return new AppResponse(cargos);
	}
}
