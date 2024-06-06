import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateAntropometriaService } from '../services/update-antropometria.service';
import { UpdateAntropometriaDto } from '../dtos/update-antropometria.dto';
import { AntropometriaNutricional } from '@prisma/client';

@ApiTags('antropometria')
@Controller('antropometria')
@ApiBearerAuth()
export class UpdateAntropometriaController {
	constructor(private updateAntropometria: UpdateAntropometriaService) {}

	@Patch(':uid')
	@ApiOperation({
		summary: 'Atualiza uma Antropometria pelo UID',
	})
	@ApiBody({
		type: UpdateAntropometriaDto,
		description: 'Dados da Antropometria a ser atualizada',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Antropometria a ser atualizada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateAntropometriaDto,
	): Promise<AntropometriaNutricional> {
		const Antropometria = await this.updateAntropometria.execute(uid, data);

		return Antropometria;
	}
}
