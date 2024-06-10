import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaRespostaDefinidaService } from '../services/delete-relatorio-pia-resposta-definida.service';
import { RoleRelatorioPia } from '@/common/enums/roles';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('relatorio-pia-resposta-definida')
@Controller('relatorio-pia-resposta-definida')
@ApiBearerAuth()
export class DeleteRelatorioPiaRespostaDefinidaController {
	constructor(
		private deleteRelatorioPiaRespostaDefinida: DeleteRelatorioPiaRespostaDefinidaService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioPia.DELETE)
	@ApiOperation({
		summary: 'Exclui um Relatório PIA Resposta Definida pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Resposta Definida a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPiaRespostaDefinida.execute(uid);

		return;
	}
}
