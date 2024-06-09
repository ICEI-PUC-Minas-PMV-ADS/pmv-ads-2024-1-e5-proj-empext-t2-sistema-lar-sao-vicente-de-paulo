import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { SemiologiaNutricional } from '@prisma/client';
import { CreateSemiologiaNutricionalService } from '../services/create-semiologia-nutricional.service';
import { CreateSemiologiaNutricionalDto } from '../dtos/create-semiologia-nutricional.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioNutricional } from '@/common/enums/roles';

@ApiTags('semiologia-nutricional')
@Controller('semiologia-nutricional')
@ApiBearerAuth()
export class CreateSemiologiaNutricionalController {
	constructor(
		private createSemiologiaNutricional: CreateSemiologiaNutricionalService,
	) {}

	@Post()
	@Roles(RoleRelatorioNutricional.CREATE)
	@ApiOperation({ summary: 'Cadastra uma nova Semiologia Nutricional' })
	@ApiBody({
		type: CreateSemiologiaNutricionalDto,
		description: 'Dados da nova Semiologia Nutricional a ser criada',
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
