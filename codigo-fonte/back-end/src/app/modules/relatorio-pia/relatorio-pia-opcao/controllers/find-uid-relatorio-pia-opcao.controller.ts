import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FindUidRelatorioPiaOpcaoService } from '../services/find-uid-relatorio-pia-opcao.service';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';

@ApiTags('relatorio-pia-resposta-opcao')
@Controller('relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class FindUidRelatorioPiaOpcaoController {
	constructor(
		private findUidRelatorioPiaOpcao: FindUidRelatorioPiaOpcaoService,
	) {}

	@Get(':uid')
	@ApiOperation({ summary: 'Busca um relatório PIA Resposta Opção pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA Resposta Opção a ser buscado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<RelatorioPiaRespostaOpcao | null> {
		const RelatorioPiaOpcao =
			await this.findUidRelatorioPiaOpcao.execute(uid);

		return RelatorioPiaOpcao;
	}
}
