import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { RegistroAntropometrico } from '@prisma/client';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';
import { FindUidRegistroAntropometricoService } from '../services/find-uid-registro-antropometrico.service';

@ApiTags('registro-antropometrico')
@Controller('registro-antropometrico')
@ApiBearerAuth()
export class FindUidRegistroAntropometricoController {
	constructor(
		private findUidRegistroAntropometrico: FindUidRegistroAntropometricoService,
	) {}

	@Get(':uid')
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({ summary: 'Busca o Registro Antropométrico pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Registro Antropométrico a ser buscada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<RegistroAntropometrico | null> {
		const Antropometria =
			await this.findUidRegistroAntropometrico.execute(uid);

		return Antropometria;
	}
}
