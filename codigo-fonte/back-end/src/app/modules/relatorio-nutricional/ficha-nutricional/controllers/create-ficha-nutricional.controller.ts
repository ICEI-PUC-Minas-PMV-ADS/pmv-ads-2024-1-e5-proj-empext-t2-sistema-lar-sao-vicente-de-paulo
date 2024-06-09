import { Body, Controller, Post } from '@nestjs/common';
import { CreateFichaNutricionalService } from '../services/create-ficha-nutricional.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFichaNutricionalDto } from '../dtos/create-ficha-nutricional';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FichaNutricional } from '@prisma/client';

@ApiTags('ficha-nutricional')
@Controller('ficha-nutricional')
@ApiBearerAuth()
export class CreateFichaNutricionalController {
	constructor(
		private createFichaNutricional: CreateFichaNutricionalService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra uma nova Ficha Nutricional' })
	@ApiBody({
		type: CreateFichaNutricionalDto,
		description: 'Dados da nova Ficha Nutricional a ser criada',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateFichaNutricionalDto,
	): Promise<FichaNutricional> {
		const fichaNutricional =
			await this.createFichaNutricional.execute(data);

		return fichaNutricional;
	}
}
