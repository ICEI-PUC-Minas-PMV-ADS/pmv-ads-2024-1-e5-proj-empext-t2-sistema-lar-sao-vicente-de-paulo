import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateRelatorioPiaRespostaService } from '../services/update-relatorio-pia-resposta.service';
import { UpdateRelatorioPiaRespostaDto } from '../dtos/update-relatorio-pia-resposta.dto';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';

@ApiTags('relatorio-pia-resposta')
@Controller('relatorio-pia-resposta')
@ApiBearerAuth()
export class UpdateRelatorioPiaRespostaController {
	constructor(
		private updateRelatorioPiaResposta: UpdateRelatorioPiaRespostaService,
	) {}

	@Patch(':uid')
	@ApiOperation({ summary: 'Atualiza um Relatório PIA Resposta pelo UID' })
	@ApiBody({
		type: UpdateRelatorioPiaRespostaDto,
		description: 'Dados do Relatório PIA Resposta a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Resposta a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaRespostaDto,
	): Promise<RelatorioPiaResposta> {
		const relatorioPiaResposta =
			await this.updateRelatorioPiaResposta.execute(uid, data);

		return relatorioPiaResposta;
	}
}
