import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { RegistroAntropometrico } from '@prisma/client';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';
import { CreateRegistroAntropometricoService } from '../services/create-registro-antropometrico.service';
import { CreateRegistroAntropometricoDto } from '../dtos/create-registro-antropometrico.dto';

@ApiTags('registro-antropometrico')
@Controller('registro-antropometrico')
@ApiBearerAuth()
export class CreateRegistroAntropometricoController {
	constructor(
		private createRegistroAntropometrico: CreateRegistroAntropometricoService,
	) {}

	@Post()
	@Roles(RoleRelatorioNutricional.CREATE)
	@ApiOperation({ summary: 'Cadastra um novo Registro Antropométrico' })
	@ApiBody({
		type: CreateRegistroAntropometricoDto,
		description: 'Dados do novo Registro Antropométrico a ser criada',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateRegistroAntropometricoDto,
	): Promise<RegistroAntropometrico> {
		const Antropometria =
			await this.createRegistroAntropometrico.execute(data);

		return Antropometria;
	}
}
