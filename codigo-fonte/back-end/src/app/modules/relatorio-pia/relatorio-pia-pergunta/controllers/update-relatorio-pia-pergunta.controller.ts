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
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class UpdateRelatorioPiaPerguntaController {
	constructor(
		private updateRelatorioPiaPergunta: UpdateRelatorioPiaPerguntaService,
	) {}

	@Patch(':uid')
	@Roles(RoleRelatorioPia.UPDATE)
	@ApiOperation({ summary: 'Atualiza um Relatório PIA Pergunta pelo UID' })
	@ApiBody({
		type: UpdateRelatorioPiaPerguntaDto,
		description: 'Dados do Relatório PIA Pergunta a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Pergunta a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaPerguntaDto,
	): Promise<RelatorioPiaPergunta> {
		const relatorioPiaPergunta =
			await this.updateRelatorioPiaPergunta.execute(uid, data);

		return relatorioPiaPergunta;
	}
}
