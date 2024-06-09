import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateRelatorioPiaOpcaoService } from '../services/update-relatorio-pia-opcao.service';
import { UpdateRelatorioPiaOpcaoDto } from '../dtos/update-relatorio-pia-opcao.dto';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-resposta-opcao')
@Controller('relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class UpdateRelatorioPiaOpcaoController {
	constructor(
		private updateRelatorioPiaOpcao: UpdateRelatorioPiaOpcaoService,
	) {}

	@Patch(':uid')
	@Roles(RoleRelatorioPia.UPDATE)
	@ApiOperation({
		summary: 'Atualiza um Relatório PIA Resposta Opção pelo UID',
	})
	@ApiBody({
		type: UpdateRelatorioPiaOpcaoDto,
		description: 'Dados do Relatório PIA Resposta Opção a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Resposta Opção a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaOpcaoDto,
	): Promise<RelatorioPiaRespostaOpcao> {
		const relatorioPiaOpcao = await this.updateRelatorioPiaOpcao.execute(
			uid,
			data,
		);

		return relatorioPiaOpcao;
	}
}
