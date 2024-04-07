import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCargoService } from '../services/update-cargo.service';
import { UpdateCargoDto } from '../dtos/update-cargo-dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargos')
@ApiTags('cargos')
@ApiBearerAuth()
export class UpdateCargoController {
	constructor(private updateCargo: UpdateCargoService) {}

	@Patch(':uid')
	@Roles(RoleCargo.UPDATE)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateCargoDto,
	): Promise<void> {
		await this.updateCargo.execute(uid, data);

		return;
	}
}
