import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateModeloRelatorioPiaService } from '../services/update-modelo-relatorio-pia.service';
import { UpdateModeloRelatorioPiaDto } from '../dtos/update-modelo-relatorio-pia.dto';

@ApiTags('modelo-relatorio-pia')
@Controller('modelo-relatorio-pia')
@ApiBearerAuth()
export class UpdateModeloRelatorioPiaController {
	constructor(
		private updateModeloRelatorioPia: UpdateModeloRelatorioPiaService,
	) {}

	@Patch(':uid')
	@ApiOperation({ summary: 'Atualiza um modelo de relatório PIA pelo UID' })
	@ApiBody({
		type: UpdateModeloRelatorioPiaDto,
		description: 'Dados do modelo de relatório PIA a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de relatório PIA a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateModeloRelatorioPiaDto,
	): Promise<void> {
		await this.updateModeloRelatorioPia.execute(uid, data);
	}
}
