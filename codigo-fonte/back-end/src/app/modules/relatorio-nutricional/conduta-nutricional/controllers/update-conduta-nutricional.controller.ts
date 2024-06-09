import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CondutaNutricional } from '@prisma/client';
import { UpdateCondutaNutricionalDto } from '../dtos/update-conduta-nutricional.dto';
import { UpdateCondutaNutricionalService } from '../services/update-conduta-nutricional.service';

@ApiTags('conduta-nutricional')
@Controller('conduta-nutricional')
@ApiBearerAuth()
export class UpdateCondutaNutricionalController {
	constructor(
		private updateCondutaNutricional: UpdateCondutaNutricionalService,
	) {}

	@Patch(':uid')
	@ApiOperation({
		summary: 'Atualiza uma Conduta Nutricional pelo UID',
	})
	@ApiBody({
		type: UpdateCondutaNutricionalDto,
		description: 'Dados da Conduta Nutricional a ser atualizada',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Conduta Nutricional a ser atualizada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateCondutaNutricionalDto,
	): Promise<CondutaNutricional> {
		const condutaNutricional = await this.updateCondutaNutricional.execute(
			uid,
			data,
		);

		return condutaNutricional;
	}
}
