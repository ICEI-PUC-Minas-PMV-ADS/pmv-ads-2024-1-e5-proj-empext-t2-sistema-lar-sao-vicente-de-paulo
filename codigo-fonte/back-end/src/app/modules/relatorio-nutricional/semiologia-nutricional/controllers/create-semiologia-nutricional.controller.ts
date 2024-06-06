import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { SemiologiaNutricional } from '@prisma/client';
import { CreateSemiologiaNutricionalService } from '../services/create-semiologia-nutricional.service';
import { CreateSemiologiaNutricionalDto } from '../dtos/create-semiologia-nutricional.dto';

@ApiTags('semiologia-nutricional')
@Controller('semiologia-nutricional')
@ApiBearerAuth()
export class CreateSemiologiaNutricionalController {
	constructor(
		private createSemiologiaNutricional: CreateSemiologiaNutricionalService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra uma nova Semiologia nutricional' })
	@ApiBody({
		type: CreateSemiologiaNutricionalDto,
		description: 'Dados da nova Semiologia nutricional a ser criada',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateSemiologiaNutricionalDto,
	): Promise<SemiologiaNutricional> {
		const semiologiaNutricional =
			await this.createSemiologiaNutricional.execute(data);

		return semiologiaNutricional;
	}
}
