import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteModeloRelatorioPiaPerguntaService } from '../services/delete-modelo-relatorio-pia-pergunta.service';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('modelo-relatorio-pia-pergunta')
@Controller('modelo-relatorio-pia-pergunta')
@ApiBearerAuth()
export class DeleteModeloRelatorioPiaPerguntaController {
	constructor(
		private deleteModeloRelatorioPiaPergunta: DeleteModeloRelatorioPiaPerguntaService,
	) {}

	@Delete(':uid')
	@Roles(RoleModeloRelatorioPia.DELETE)
	@ApiOperation({ summary: 'Exclui um modelo de pergunta' })
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de pergunta a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteModeloRelatorioPiaPergunta.execute(uid);
	}
}
