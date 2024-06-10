import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CreateModeloRelatorioPiaRespostaService } from '../services/create-modelo-relatorio-pia-resposta.service';
import { CreateModeloRelatorioPiaRespostaDto } from '../dtos/create-modelo-relatorio-pia-resposta.dto';
import { ModeloRelatorioPiaResposta } from '../entities/modelo-relatorio-pia-resposta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-resposta')
@Controller('modelo-relatorio-pia-resposta')
@ApiBearerAuth()
export class CreateModeloRelatorioPiaRespostaController {
	constructor(
		private createModeloRelatorioPiaResposta: CreateModeloRelatorioPiaRespostaService,
	) {}

	@Post()
	@Roles(RoleModeloRelatorioPia.CREATE)
	@ApiOperation({
		summary: 'Cria um modelo de resposta para o modelo de pergunta',
	})
	@ApiBody({
		type: CreateModeloRelatorioPiaRespostaDto,
		description: 'Dados do modelo de resposta a ser criado',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateModeloRelatorioPiaRespostaDto,
	): Promise<ModeloRelatorioPiaResposta> {
		const modeloRelatorioPiaResposta =
			await this.createModeloRelatorioPiaResposta.execute(data);

		return modeloRelatorioPiaResposta;
	}
}
