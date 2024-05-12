import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CreateRelatorioPiaRespostaService } from '../services/create-relatorio-pia-resposta.service';
import { CreateRelatorioPiaRespostaDto } from '../dtos/create-relatorio-pia-resposta.dto';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';

@ApiTags('relatorio-pia-resposta')
@Controller('relatorio-pia-resposta')
@ApiBearerAuth()
export class CreateRelatorioPiaRespostaController {
	constructor(
		private createRelatorioPiaResposta: CreateRelatorioPiaRespostaService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cria um Relatório PIA Resposta' })
	@ApiBody({
		type: CreateRelatorioPiaRespostaDto,
		description: 'Dados do Relatório PIA Resposta a ser criado',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateRelatorioPiaRespostaDto,
	): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta =
			await this.createRelatorioPiaResposta.execute(data);

		return relatorioPiaResposta;
	}
}
