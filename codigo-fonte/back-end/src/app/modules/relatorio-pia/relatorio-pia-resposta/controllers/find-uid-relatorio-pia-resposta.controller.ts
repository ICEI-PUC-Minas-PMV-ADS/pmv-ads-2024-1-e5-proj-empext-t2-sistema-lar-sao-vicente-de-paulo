import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FindUidRelatorioPiaRespostaService } from '../services/find-uid-relatorio-pia-resposta.service';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-resposta')
@Controller('relatorio-pia-resposta')
@ApiBearerAuth()
export class FindUidRelatorioPiaRespostaController {
	constructor(
		private findUidRelatorioPiaResposta: FindUidRelatorioPiaRespostaService,
	) {}

	@Get(':uid')
	@Roles(RoleRelatorioPia.FIND)
	@ApiOperation({ summary: 'Busca um Relatório PIA Resposta pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Resposta a ser buscado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<RelatorioPiaResposta | null> {
		const relatorioPiaResposta =
			await this.findUidRelatorioPiaResposta.execute(uid);

		return relatorioPiaResposta;
	}
}
