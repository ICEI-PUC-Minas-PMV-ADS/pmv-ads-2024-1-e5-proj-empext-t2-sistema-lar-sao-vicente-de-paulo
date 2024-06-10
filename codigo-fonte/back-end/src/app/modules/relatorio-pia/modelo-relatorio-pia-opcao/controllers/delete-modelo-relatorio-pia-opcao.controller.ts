import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteModeloRelatorioPiaOpcaoService } from '../services/delete-modelo-relatorio-pia-opcao.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-resposta-opcao')
@Controller('modelo-relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class DeleteModeloRelatorioPiaOpcaoController {
	constructor(
		private deleteModeloRelatorioPiaOpcao: DeleteModeloRelatorioPiaOpcaoService,
	) {}

	@Delete(':uid')
	@Roles(RoleModeloRelatorioPia.DELETE)
	@ApiOperation({ summary: 'Exclui um modelo de opção de resposta' })
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de opção de resposta a ser excluída',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteModeloRelatorioPiaOpcao.execute(uid);
	}
}
