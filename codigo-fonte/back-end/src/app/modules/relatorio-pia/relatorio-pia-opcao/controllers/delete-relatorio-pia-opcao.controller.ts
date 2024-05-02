import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaOpcaoService } from '../services/delete-relatorio-pia-opcao.service';

@ApiTags('relatorio-pia-resposta-opcao')
@Controller('relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class DeleteRelatorioPiaOpcaoController {
	constructor(
		private deleteRelatorioPiaOpcao: DeleteRelatorioPiaOpcaoService,
	) {}

	@Delete(':uid')
	@ApiOperation({
		summary: 'Exclui um relatório PIA Resposta Opção pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA Resposta Opção a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPiaOpcao.execute(uid);
	}
}
