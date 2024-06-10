import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteQuadroClinicoService } from '../services/delete-quadro-clinico.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('quadro-clinico')
@Controller('quadro-clinico')
@ApiBearerAuth()
export class DeleteQuadroClinicoController {
	constructor(private deleteQuadroClinico: DeleteQuadroClinicoService) {}

	@Delete(':uid')
	@Roles(RoleRelatorioNutricional.DELETE)
	@ApiOperation({
		summary: 'Exclui um Quadro Clínico pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Quadro Clínico a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteQuadroClinico.execute(uid);

		return;
	}
}
