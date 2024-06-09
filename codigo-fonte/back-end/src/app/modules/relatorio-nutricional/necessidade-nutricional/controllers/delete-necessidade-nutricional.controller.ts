import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteNecessidadeNutricionalService } from '../services/delete-necessidade-nutricional.service';

@ApiTags('necessidade-nutricional')
@Controller('necessidade-nutricional')
@ApiBearerAuth()
export class DeleteNecessidadeNutricionalController {
	constructor(
		private deleteNecessidadeNutricional: DeleteNecessidadeNutricionalService,
	) {}

	@Delete(':uid')
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
