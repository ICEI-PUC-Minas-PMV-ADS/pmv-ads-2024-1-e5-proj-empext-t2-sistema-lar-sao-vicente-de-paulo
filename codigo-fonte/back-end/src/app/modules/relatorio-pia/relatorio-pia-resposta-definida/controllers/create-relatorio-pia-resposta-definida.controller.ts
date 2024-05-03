import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CreateRelatorioPiaRespostaDefinidaService } from '../services/create-relatorio-pia-resposta-definida.service';
import { CreateRelatorioPiaRespostaDefinidaDto } from '../dtos/create-relatorio-pia-resposta-definida.dto';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';

@ApiTags('relatorio-pia-resposta-definida')
@Controller('relatorio-pia-resposta-definida')
@ApiBearerAuth()
export class CreateRelatorioPiaRespostaDefinidaController {
	constructor(
		private createRelatorioPiaRespostaDefinida: CreateRelatorioPiaRespostaDefinidaService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Cria um Relatório PIA Resposta Definida' })
	@ApiBody({
		type: CreateRelatorioPiaRespostaDefinidaDto,
		description: 'Dados do Relatório PIA Resposta Definida a ser criada',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateRelatorioPiaRespostaDefinidaDto,
	): Promise<RelatorioPiaRespostaDefinida> {
		const relatorioPiaRespostaDefinida =
			await this.createRelatorioPiaRespostaDefinida.execute(data);

		return relatorioPiaRespostaDefinida;
	}
}
