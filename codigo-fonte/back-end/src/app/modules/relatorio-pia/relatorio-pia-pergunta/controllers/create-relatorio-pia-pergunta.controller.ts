import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CreateRelatorioPiaPerguntaService } from '../services/create-relatorio-pia-pergunta.service';
import { CreateRelatorioPiaPerguntaDto } from '../dtos/create-relatorio-pia-pergunta.dto';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class CreateRelatorioPiaPerguntaController {
	constructor(
		private createRelatorioPiaPergunta: CreateRelatorioPiaPerguntaService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cria um relatório PIA Pergunta' })
	@ApiBody({
		type: CreateRelatorioPiaPerguntaDto,
		description: 'Dados do relatório PIA Pergunta a ser criado',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateRelatorioPiaPerguntaDto,
	): Promise<RelatorioPiaPergunta> {
		const relatorioPia =
			await this.createRelatorioPiaPergunta.execute(data);

		return relatorioPia;
	}
}
