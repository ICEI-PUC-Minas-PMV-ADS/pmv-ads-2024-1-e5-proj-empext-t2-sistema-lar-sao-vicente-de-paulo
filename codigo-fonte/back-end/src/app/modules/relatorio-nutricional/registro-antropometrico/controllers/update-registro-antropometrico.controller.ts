import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { RegistroAntropometrico } from '@prisma/client';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';
import { UpdateRegistroAntropometricoDto } from '../dtos/update-registro-antropometrico.dto';
import { UpdateRegistroAntropometricoService } from '../services/update-registro-antropometrico.service';

@ApiTags('registro-antropometrico')
@Controller('registro-antropometrico')
@ApiBearerAuth()
export class UpdateRegistroAntropometricoController {
	constructor(
		private updateRegistroAntropometrico: UpdateRegistroAntropometricoService,
	) {}

	@Patch(':uid')
	@Roles(RoleRelatorioNutricional.UPDATE)
	@ApiOperation({
		summary: 'Atualiza um Registro Antropométrico pelo UID',
	})
	@ApiBody({
		type: UpdateRegistroAntropometricoDto,
		description: 'Dados do Registro Antropométrico a ser atualizada',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Registro Antropométrico a ser atualizada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRegistroAntropometricoDto,
	): Promise<RegistroAntropometrico> {
		const Antropometria = await this.updateRegistroAntropometrico.execute(
			uid,
			data,
		);

		return Antropometria;
	}
}
