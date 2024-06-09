import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaOpcaoService } from '../services/delete-relatorio-pia-opcao.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia-resposta-opcao')
@Controller('relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class DeleteRelatorioPiaOpcaoController {
	constructor(
		private deleteRelatorioPiaOpcao: DeleteRelatorioPiaOpcaoService,
	) {}

	@Delete(':uid')
	@Roles(RoleRelatorioPia.DELETE)
	@ApiOperation({
		summary: 'Exclui um Relatório PIA Resposta Opção pelo UID',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA Resposta Opção a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPiaOpcao.execute(uid);

		return;
	}
}
