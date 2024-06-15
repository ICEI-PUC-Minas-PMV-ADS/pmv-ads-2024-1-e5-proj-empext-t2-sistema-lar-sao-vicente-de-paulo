import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';
import { DeleteRegistroAntropometricoService } from '../services/delete-registro-antropometrico.service';

@ApiTags('registro-antropometrico')
@Controller('registro-antropometrico')
@ApiBearerAuth()
export class DeleteRegistroAntropometricoController {
	constructor(
		private deleteRegistroAntropometrico: DeleteRegistroAntropometricoService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioNutricional.DELETE)
	@ApiOperation({
		summary: 'Exclui um Registro Antropométrico pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Registro Antropométrico a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRegistroAntropometrico.execute(uid);

		return;
	}
}
