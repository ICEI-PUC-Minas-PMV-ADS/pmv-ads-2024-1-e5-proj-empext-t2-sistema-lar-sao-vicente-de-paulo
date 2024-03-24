import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCargoService } from '../services/update-cargo.service';
import { UpdateCargoDto } from '../dtos/update-cargo-dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargos')
@ApiTags('cargos')
export class UpdateCargoController {
	constructor(private updateCargo: UpdateCargoService) {}

	@Put(':uid')
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateCargoDto,
	): Promise<void> {
		await this.updateCargo.execute(uid, data);

		return;
	}
}
