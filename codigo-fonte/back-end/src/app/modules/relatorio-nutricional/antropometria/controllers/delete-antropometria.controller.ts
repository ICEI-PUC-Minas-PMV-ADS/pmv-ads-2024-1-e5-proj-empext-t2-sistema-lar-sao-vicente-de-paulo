import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteAntropometriaService } from '../services/delete-antropometria.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('antropometria')
@Controller('antropometria')
@ApiBearerAuth()
export class DeleteAntropometriaController {
	constructor(private deleteAntropometria: DeleteAntropometriaService) {}

	@Delete(':uid')
	@Roles(RoleRelatorioNutricional.DELETE)
	@ApiOperation({
		summary: 'Exclui uma Antropometria pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Antropometria a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteAntropometria.execute(uid);

		return;
	}
}
