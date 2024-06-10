import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CreateRelatorioPiaPerguntaService } from '../services/create-relatorio-pia-pergunta.service';
import { CreateRelatorioPiaPerguntaDto } from '../dtos/create-relatorio-pia-pergunta.dto';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class CreateRelatorioPiaPerguntaController {
	constructor(
		private createRelatorioPiaPergunta: CreateRelatorioPiaPerguntaService,
	) {}

	@Post()
	@Roles(RoleRelatorioPia.CREATE)
	@ApiOperation({ summary: 'Cria um Relatório PIA Pergunta' })
	@ApiBody({
		type: CreateRelatorioPiaPerguntaDto,
		description: 'Dados do Relatório PIA Pergunta a ser criado',
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
