import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { NecessidadeNutricional } from '@prisma/client';
import { FindUidNecessidadeNutricionalService } from '../services/find-uid-necessidade-nutricional.service';

@ApiTags('necessidade-nutricional')
@Controller('necessidade-nutricional')
@ApiBearerAuth()
export class FindUidNecessidadeNutricionalController {
	constructor(
		private findUidNecessidadeNutricional: FindUidNecessidadeNutricionalService,
	) {}

	@Get(':uid')
	@ApiOperation({ summary: 'Busca uma Necessidade Nutricional pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID da Necessidade Nutricional a ser buscada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<NecessidadeNutricional | null> {
		const necessidadeNutricional =
			await this.findUidNecessidadeNutricional.execute(uid);

		return necessidadeNutricional;
	}
}
