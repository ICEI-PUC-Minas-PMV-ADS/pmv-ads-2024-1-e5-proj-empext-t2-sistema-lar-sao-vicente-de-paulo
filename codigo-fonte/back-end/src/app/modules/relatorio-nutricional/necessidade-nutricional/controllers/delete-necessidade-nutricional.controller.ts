import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteNecessidadeNutricionalService } from '../services/delete-necessidade-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('necessidade-nutricional')
@Controller('necessidade-nutricional')
@ApiBearerAuth()
export class DeleteNecessidadeNutricionalController {
	constructor(
		private deleteNecessidadeNutricional: DeleteNecessidadeNutricionalService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioNutricional.DELETE)
	@ApiOperation({
		summary: 'Exclui uma Necessidade Nutricional pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Necessidade Nutricional a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteNecessidadeNutricional.execute(uid);

		return;
	}
}
