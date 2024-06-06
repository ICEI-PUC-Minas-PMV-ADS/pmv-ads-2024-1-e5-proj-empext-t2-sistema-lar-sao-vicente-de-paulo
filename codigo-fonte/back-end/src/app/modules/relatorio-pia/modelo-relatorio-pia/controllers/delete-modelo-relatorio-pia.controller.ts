import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteModeloRelatorioPiaService } from '../services/delete-modelo-relatorio-pia.service';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@ApiTags('modelo-relatorio-pia')
@Controller('modelo-relatorio-pia')
@ApiBearerAuth()
export class DeleteModeloRelatorioPiaController {
	constructor(
		private deleteModeloRelatorioPia: DeleteModeloRelatorioPiaService,
	) {}

	@Delete(':uid')
	@ApiOperation({ summary: 'Exclui um modelo de relatório PIA pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de relatório PIA a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteModeloRelatorioPia.execute(uid);
	}
}
