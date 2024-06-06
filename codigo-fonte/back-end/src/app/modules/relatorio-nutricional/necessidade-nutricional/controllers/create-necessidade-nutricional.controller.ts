import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { NecessidadeNutricional } from '@prisma/client';
import { CreateNecessidadeNutricionalService } from '../services/create-necessidade-nutricional.service';
import { CreateNecessidadeNutricionalDto } from '../dtos/create-necessidade-nutricional.dto';

@ApiTags('necessidade-nutricional')
@Controller('necessidade-nutricional')
@ApiBearerAuth()
export class CreateNecessidadeNutricionalController {
	constructor(
		private createNecessidadeNutricional: CreateNecessidadeNutricionalService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra uma nova Necessidade nutricional' })
	@ApiBody({
		type: CreateNecessidadeNutricionalDto,
		description: 'Dados da nova Necessidade nutricional a ser criada',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateNecessidadeNutricionalDto,
	): Promise<NecessidadeNutricional> {
		const necessidadeNutricional =
			await this.createNecessidadeNutricional.execute(data);

		return necessidadeNutricional;
	}
}
