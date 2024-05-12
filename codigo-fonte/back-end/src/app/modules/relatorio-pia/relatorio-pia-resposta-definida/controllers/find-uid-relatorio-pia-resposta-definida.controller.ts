import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FindUidRelatorioPiaRespostaDefinidaService } from '../services/find-uid-relatorio-pia-resposta-definida.service';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';

@ApiTags('relatorio-pia-resposta-definida')
@Controller('relatorio-pia-resposta-definida')
@ApiBearerAuth()
export class FindUidRelatorioPiaRespostaDefinidaController {
	constructor(
		private findUidRelatorioPiaRespostaDefinida: FindUidRelatorioPiaRespostaDefinidaService,
	) {}

	@Get(':uid')
	@ApiOperation({
		summary: 'Busca um Relatório PIA Resposta Definida pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Resposta Definida a ser buscada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<RelatorioPiaRespostaDefinida | null> {
		const relatorioPiaRespostaDefinida =
			await this.findUidRelatorioPiaRespostaDefinida.execute(uid);

		return relatorioPiaRespostaDefinida;
	}
}
