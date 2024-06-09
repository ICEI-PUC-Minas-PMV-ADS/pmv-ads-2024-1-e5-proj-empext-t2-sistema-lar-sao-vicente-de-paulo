import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { NecessidadeNutricional } from '@prisma/client';
import { CreateNecessidadeNutricionalService } from '../services/create-necessidade-nutricional.service';
import { CreateNecessidadeNutricionalDto } from '../dtos/create-necessidade-nutricional.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('necessidade-nutricional')
@Controller('necessidade-nutricional')
@ApiBearerAuth()
export class CreateNecessidadeNutricionalController {
	constructor(
		private createNecessidadeNutricional: CreateNecessidadeNutricionalService,
	) {}

	@Post()
	@Roles(RoleRelatorioNutricional.CREATE)
	@ApiOperation({ summary: 'Cadastra uma nova Necessidade Nutricional' })
	@ApiBody({
		type: CreateNecessidadeNutricionalDto,
		description: 'Dados da nova Necessidade Nutricional a ser criada',
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
