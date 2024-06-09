import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CondutaNutricional } from '@prisma/client';
import { CreateCondutaNutricionalService } from '../services/create-conduta-nutricional.service';
import { CreateCondutaNutricionalDto } from '../dtos/create-conduta-nutricional.dto';

@ApiTags('conduta-nutricional')
@Controller('conduta-nutricional')
@ApiBearerAuth()
export class CreateCondutaNutricionalController {
	constructor(
		private createCondutaNutricional: CreateCondutaNutricionalService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra uma nova Conduta Nutricional' })
	@ApiBody({
		type: CreateCondutaNutricionalDto,
		description: 'Dados da nova Conduta Nutricional a ser criada',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateCondutaNutricionalDto,
	): Promise<CondutaNutricional> {
		const condutaNutricional =
			await this.createCondutaNutricional.execute(data);

		return condutaNutricional;
	}
}
