import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateRelatorioPiaRespostaDefinidaService } from '../services/update-relatorio-pia-resposta-definida.service';
import { UpdateRelatorioPiaRespostaDefinidaDto } from '../dtos/update-relatorio-pia-resposta-definida.dto';

@ApiTags('relatorio-pia-resposta-definida')
@Controller('relatorio-pia-resposta-definida')
@ApiBearerAuth()
export class UpdateRelatorioPiaRespostaDefinidaController {
	constructor(
		private updateRelatorioPiaRespostaDefinida: UpdateRelatorioPiaRespostaDefinidaService,
	) {}

	@Patch(':uid')
	@ApiOperation({
		summary: 'Atualiza um relatório PIA Resposta Definida pelo UID',
	})
	@ApiBody({
		type: UpdateRelatorioPiaRespostaDefinidaDto,
		description:
			'Dados do relatório PIA Resposta Definida a ser atualizada',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA Resposta Definida a ser atualizada',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaRespostaDefinidaDto,
	): Promise<void> {
		await this.updateRelatorioPiaRespostaDefinida.execute(uid, data);
	}
}
