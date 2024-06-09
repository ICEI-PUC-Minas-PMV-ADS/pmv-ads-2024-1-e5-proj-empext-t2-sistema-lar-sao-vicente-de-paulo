import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FindUidRelatorioPiaPerguntaService } from '../services/find-uid-relatorio-pia-pergunta.service';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class FindUidRelatorioPiaPerguntaController {
	constructor(
		private findUidRelatorioPiaPergunta: FindUidRelatorioPiaPerguntaService,
	) {}

	@Get(':uid')
	@Roles(RoleRelatorioPia.FIND)
	@ApiOperation({ summary: 'Busca um Relatório PIA Pergunta pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Pergunta a ser buscado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<RelatorioPiaPergunta | null> {
		const relatorioPiaPergunta =
			await this.findUidRelatorioPiaPergunta.execute(uid);

		return relatorioPiaPergunta;
	}
}
