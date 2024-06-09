import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { AntropometriaNutricional } from '@prisma/client';
import { FindUidAntropometriaService } from '../services/find-uid-antropometria.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('antropometria')
@Controller('antropometria')
@ApiBearerAuth()
export class FindUidAntropometriaController {
	constructor(private findUidAntropometria: FindUidAntropometriaService) {}

	@Get(':uid')
	@Roles(RoleRelatorioNutricional.FIND)
	@ApiOperation({ summary: 'Busca uma Antropometria pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID da Antropometria a ser buscada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AntropometriaNutricional | null> {
		const Antropometria = await this.findUidAntropometria.execute(uid);

		return Antropometria;
	}
}
