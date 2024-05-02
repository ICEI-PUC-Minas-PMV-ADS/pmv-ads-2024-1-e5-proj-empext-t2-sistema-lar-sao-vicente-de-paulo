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

@ApiTags('relatorio-pia-resposta-opcao')
@Controller('relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class UpdateRelatorioPiaOpcaoController {
	constructor(
		private updateRelatorioPiaOpcao: UpdateRelatorioPiaOpcaoService,
	) {}

	@Patch(':uid')
	@ApiOperation({
		summary: 'Atualiza um relatório PIA Resposta Opção pelo UID',
	})
	@ApiBody({
		type: UpdateRelatorioPiaOpcaoDto,
		description: 'Dados do relatório PIA Resposta Opção a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA Resposta Opção a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaOpcaoDto,
	): Promise<void> {
		await this.updateRelatorioPiaOpcao.execute(uid, data);
	}
}
