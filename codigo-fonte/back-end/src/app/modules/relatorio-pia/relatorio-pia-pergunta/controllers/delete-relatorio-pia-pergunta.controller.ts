import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaPerguntaService } from '../services/delete-relatorio-pia-pergunta.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-pergunta')
@Controller('relatorio-pia-pergunta')
@ApiBearerAuth()
export class DeleteRelatorioPiaPerguntaController {
	constructor(
		private deleteRelatorioPiaPergunta: DeleteRelatorioPiaPerguntaService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioPia.DELETE)
	@ApiOperation({ summary: 'Exclui um Relatório PIA Pergunta pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Pergunta a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPiaPergunta.execute(uid);

		return;
	}
}
