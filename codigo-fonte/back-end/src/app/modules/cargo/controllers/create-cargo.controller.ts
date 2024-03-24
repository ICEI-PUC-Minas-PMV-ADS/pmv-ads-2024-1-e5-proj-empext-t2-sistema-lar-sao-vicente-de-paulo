import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCargoDto } from '../dtos/create-cargo-dto';
import { CreateCargoService } from '../services/create-cargo.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@Controller('cargos')
@ApiTags('cargos')
export class CreateCargoController {
	constructor(private createCargo: CreateCargoService) {}

	@Post()
	@ApiResponseError()
	async handle(@Body() data: CreateCargoDto): Promise<void> {
		await this.createCargo.execute(data);

		return;
	}
}
