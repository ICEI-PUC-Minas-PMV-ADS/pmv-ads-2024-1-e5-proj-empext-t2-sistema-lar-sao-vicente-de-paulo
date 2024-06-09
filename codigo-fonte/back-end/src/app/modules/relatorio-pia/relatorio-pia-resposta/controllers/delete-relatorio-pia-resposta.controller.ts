import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaRespostaService } from '../services/delete-relatorio-pia-resposta.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-resposta')
@Controller('relatorio-pia-resposta')
@ApiBearerAuth()
export class DeleteRelatorioPiaRespostaController {
	constructor(
		private deleteRelatorioPiaResposta: DeleteRelatorioPiaRespostaService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioPia.DELETE)
	@ApiOperation({ summary: 'Exclui um Relatório PIA Resposta pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Resposta a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPiaResposta.execute(uid);

		return;
	}
}
