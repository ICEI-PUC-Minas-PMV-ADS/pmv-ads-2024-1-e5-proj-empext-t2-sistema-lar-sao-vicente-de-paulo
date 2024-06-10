import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FindUidModeloRelatorioPiaRespostaService } from '../services/find-uid-modelo-relatorio-pia-resposta.service';
import { ModeloRelatorioPiaResposta } from '../entities/modelo-relatorio-pia-resposta.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-resposta')
@Controller('modelo-relatorio-pia-resposta')
@ApiBearerAuth()
export class FindUidModeloRelatorioPiaRespostaController {
	constructor(
		private findUidModeloRelatorioPiaRespostaService: FindUidModeloRelatorioPiaRespostaService,
	) {}

	@Get(':uid')
	@Roles(RoleModeloRelatorioPia.FIND)
	@ApiOperation({ summary: 'Busca um modelo de resposta pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de resposta a ser buscado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<ModeloRelatorioPiaResposta | null> {
		const modeloRelatorioPiaResposta =
			await this.findUidModeloRelatorioPiaRespostaService.execute(uid);

		return modeloRelatorioPiaResposta;
	}
}
