import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { QuadroClinico } from '@prisma/client';
import { CreateQuadroClinicoService } from '../services/create-quadro-clinico.service';
import { CreateQuadroClinicoDto } from '../dtos/create-quadro-clinico.dto';

@ApiTags('quadro-clinico')
@Controller('quadro-clinico')
@ApiBearerAuth()
export class CreateQuadroClinicoController {
	constructor(private createQuadroClinico: CreateQuadroClinicoService) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra um novo Quadro Clínico' })
	@ApiBody({
		type: CreateQuadroClinicoDto,
		description: 'Dados do novo Quadro Clínico a ser criado',
	})
	@ApiResponseError()
	async handle(@Body() data: CreateQuadroClinicoDto): Promise<QuadroClinico> {
		const quadroClinico = await this.createQuadroClinico.execute(data);

		return quadroClinico;
	}
}
