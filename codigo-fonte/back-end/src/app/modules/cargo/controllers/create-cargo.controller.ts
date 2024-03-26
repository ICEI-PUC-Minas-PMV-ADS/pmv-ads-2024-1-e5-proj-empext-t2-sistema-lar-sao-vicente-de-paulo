import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCargoDto } from '../dtos/create-cargo-dto';
import { CreateCargoService } from '../services/create-cargo.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleCargo } from '@/common/enums/roles';

@Controller('cargos')
@ApiTags('cargos')
@ApiBearerAuth()
export class CreateCargoController {
	constructor(private createCargo: CreateCargoService) {}

	@Post()
	@Roles(RoleCargo.CREATE)
	@ApiResponseError()
	async handle(@Body() data: CreateCargoDto): Promise<void> {
		await this.createCargo.execute(data);

		return;
	}
}
