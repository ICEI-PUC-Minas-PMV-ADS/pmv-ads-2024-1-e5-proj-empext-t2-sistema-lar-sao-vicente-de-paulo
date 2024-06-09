import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteFichaNutricionalService } from '../services/delete-ficha-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('ficha-nutricional')
@Controller('ficha-nutricional')
@ApiBearerAuth()
export class DeleteFichaNutricionalController {
	constructor(
		private deleteFichaNutricional: DeleteFichaNutricionalService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioNutricional.DELETE)
	@ApiOperation({
		summary: 'Exclui uma Ficha Nutricional pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Ficha Nutricional a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteFichaNutricional.execute(uid);

		return;
	}
}
