import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { DeleteRelatorioPiaService } from '../services/delete-relatorio-pia.service';

@ApiTags('relatorio-pia')
@Controller('relatorio-pia')
@ApiBearerAuth()
export class DeleteRelatorioPiaController {
	constructor(private deleteRelatorioPia: DeleteRelatorioPiaService) {}

	@Delete(':uid')
	@ApiOperation({ summary: 'Exclui um Relatório PIA pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA a ser excluído',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteRelatorioPia.execute(uid);

		return;
	}
}
