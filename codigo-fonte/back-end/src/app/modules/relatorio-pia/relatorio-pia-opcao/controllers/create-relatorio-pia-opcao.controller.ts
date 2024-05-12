import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CreateRelatorioPiaOpcaoService } from '../services/create-relatorio-pia-opcao.service';
import { CreateRelatorioPiaOpcaoDto } from '../dtos/create-relatorio-pia-opcao.dto';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';

@ApiTags('relatorio-pia-resposta-opcao')
@Controller('relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class CreateRelatorioPiaOpcaoController {
	constructor(
		private createRelatorioPiaOpcao: CreateRelatorioPiaOpcaoService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cria um Relatório PIA Resposta Opção' })
	@ApiBody({
		type: CreateRelatorioPiaOpcaoDto,
		description: 'Dados do Relatório PIA Resposta Opção a ser criado',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateRelatorioPiaOpcaoDto,
	): Promise<RelatorioPiaRespostaOpcao> {
		const relatorioPiaOpcao =
			await this.createRelatorioPiaOpcao.execute(data);

		return relatorioPiaOpcao;
	}
}
