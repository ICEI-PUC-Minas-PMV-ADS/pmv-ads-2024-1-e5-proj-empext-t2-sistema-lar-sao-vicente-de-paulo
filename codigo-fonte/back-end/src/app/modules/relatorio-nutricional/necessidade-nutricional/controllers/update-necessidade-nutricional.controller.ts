import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { NecessidadeNutricional } from '@prisma/client';
import { UpdateNecessidadeNutricionalDto } from '../dtos/update-necessidade-nutricional.dto';
import { UpdateNecessidadeNutricionalService } from '../services/update-necessidade-nutricional.service';

@ApiTags('necessidade-nutricional')
@Controller('necessidade-nutricional')
@ApiBearerAuth()
export class UpdateNecessidadeNutricionalController {
	constructor(
		private updateNecessidadeNutricional: UpdateNecessidadeNutricionalService,
	) {}

	@Patch(':uid')
	@ApiOperation({
		summary: 'Atualiza uma Necessidade Nutricional pelo UID',
	})
	@ApiBody({
		type: UpdateNecessidadeNutricionalDto,
		description: 'Dados da Necessidade Nutricional a ser atualizada',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID da Necessidade Nutricional a ser atualizada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateNecessidadeNutricionalDto,
	): Promise<NecessidadeNutricional> {
		const necessidadeNutricional =
			await this.updateNecessidadeNutricional.execute(uid, data);

		return necessidadeNutricional;
	}
}
