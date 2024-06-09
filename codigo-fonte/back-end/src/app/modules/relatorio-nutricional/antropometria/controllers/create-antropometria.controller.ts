import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { AntropometriaNutricional } from '@prisma/client';
import { CreateAntropometriaService } from '../services/create-antropometria.service';
import { CreateAntropometriaDto } from '../dtos/create-antropometria.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('antropometria')
@Controller('antropometria')
@ApiBearerAuth()
export class CreateAntropometriaController {
	constructor(private createAntropometria: CreateAntropometriaService) {}

	@Post()
	@Roles(RoleRelatorioNutricional.CREATE)
	@ApiOperation({ summary: 'Cadastra uma nova Antropometria' })
	@ApiBody({
		type: CreateAntropometriaDto,
		description: 'Dados da nova Antropometria a ser criada',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateAntropometriaDto,
	): Promise<AntropometriaNutricional> {
		const Antropometria = await this.createAntropometria.execute(data);

		return Antropometria;
	}
}
