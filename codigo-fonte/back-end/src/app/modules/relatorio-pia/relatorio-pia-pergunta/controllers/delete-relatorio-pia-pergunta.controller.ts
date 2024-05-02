import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaPerguntaService } from '../services/delete-relatorio-pia-pergunta.service';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class DeleteRelatorioPiaPerguntaController {
	constructor(
		private deleteRelatorioPiaPergunta: DeleteRelatorioPiaPerguntaService,
	) {}

	@Delete(':uid')
	@ApiOperation({ summary: 'Exclui um relatório PIA Pergunta pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA Pergunta a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPiaPergunta.execute(uid);
	}
}
