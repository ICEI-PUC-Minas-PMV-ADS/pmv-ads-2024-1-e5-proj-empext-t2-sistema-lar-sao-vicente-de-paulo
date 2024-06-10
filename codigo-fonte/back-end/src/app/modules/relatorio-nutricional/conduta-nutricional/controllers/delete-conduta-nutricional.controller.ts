import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteCondutaNutricionalService } from '../services/delete-conduta-nutricional.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('conduta-nutricional')
@Controller('conduta-nutricional')
@ApiBearerAuth()
export class DeleteCondutaNutricionalController {
	constructor(
		private deleteCondutaNutricional: DeleteCondutaNutricionalService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioNutricional.DELETE)
	@ApiOperation({
		summary: 'Exclui uma Conduta Nutricional pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Conduta Nutricional a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteCondutaNutricional.execute(uid);

		return;
	}
}
