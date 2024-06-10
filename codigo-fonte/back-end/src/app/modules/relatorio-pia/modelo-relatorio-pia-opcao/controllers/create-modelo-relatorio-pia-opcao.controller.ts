import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { CreateModeloRelatorioPiaOpcaoService } from '../services/create-modelo-relatorio-pia-opcao.service';
import { CreateModeloRelatorioPiaOpcaoDto } from '../dtos/create-modelo-relatorio-pia-opcao.dto';
import { ModeloRelatorioPiaRespostaOpcao } from '../entities/modelo-relatorio-pia-opcao';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-resposta-opcao')
@Controller('modelo-relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class CreateModeloRelatorioPiaOpcaoController {
	constructor(
		private createModeloRelatorioPiaOpcao: CreateModeloRelatorioPiaOpcaoService,
	) {}

	@Post()
	@Roles(RoleModeloRelatorioPia.CREATE)
	@ApiOperation({ summary: 'Cria um modelo de opção de resposta' })
	@ApiBody({
		type: CreateModeloRelatorioPiaOpcaoDto,
		description: 'Dados do modelo de opção de resposta a ser criado',
	})
	@ApiResponseError()
	async handle(
		@Body() data: CreateModeloRelatorioPiaOpcaoDto,
	): Promise<ModeloRelatorioPiaRespostaOpcao> {
		const modeloRelatorioPiaOpcao =
			await this.createModeloRelatorioPiaOpcao.execute(data);

		return modeloRelatorioPiaOpcao;
	}
}
