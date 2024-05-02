import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaRespostaDefinidaService } from '../services/delete-relatorio-pia-resposta-definida.service';

@ApiTags('relatorio-pia-resposta-definida')
@Controller('relatorio-pia-resposta-definida')
@ApiBearerAuth()
export class DeleteRelatorioPiaRespostaDefinidaController {
	constructor(
		private deleteRelatorioPiaRespostaDefinida: DeleteRelatorioPiaRespostaDefinidaService,
	) {}

	@Delete(':uid')
	@ApiOperation({
		summary: 'Exclui um relatório PIA Resposta Definida pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA Resposta Definida a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPiaRespostaDefinida.execute(uid);
	}
}
