import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateRelatorioPiaPerguntaService } from '../services/update-relatorio-pia-pergunta.service';
import { UpdateRelatorioPiaPerguntaDto } from '../dtos/update-relatorio-pia-pergunta.dto';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class UpdateRelatorioPiaPerguntaController {
	constructor(
		private updateRelatorioPiaPergunta: UpdateRelatorioPiaPerguntaService,
	) {}

	@Patch(':uid')
	@ApiOperation({ summary: 'Atualiza um relatório PIA Pergunta pelo UID' })
	@ApiBody({
		type: UpdateRelatorioPiaPerguntaDto,
		description: 'Dados do relatório PIA Pergunta a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA Pergunta a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaPerguntaDto,
	): Promise<void> {
		await this.updateRelatorioPiaPergunta.execute(uid, data);
	}
}
