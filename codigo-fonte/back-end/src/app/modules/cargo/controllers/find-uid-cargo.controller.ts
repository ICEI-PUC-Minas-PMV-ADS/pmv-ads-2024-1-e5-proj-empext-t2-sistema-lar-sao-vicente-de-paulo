import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@utils/app-response';
import { Cargo } from '../entities/cargo.entity';
import { FindUidCargoService } from '../services/find-uid-cargo.service';
import { ApiFindResponse } from '@/common/decorators/api-find-response.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargos')
@ApiTags('cargos')
export class FindUidCargoController {
	constructor(private findUidCargo: FindUidCargoService) {}

	@Get(':uid')
	@ApiFindResponse(Cargo)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<Cargo | null>> {
		const cargos = await this.findUidCargo.execute(uid);

		return new AppResponse(cargos);
	}
}
