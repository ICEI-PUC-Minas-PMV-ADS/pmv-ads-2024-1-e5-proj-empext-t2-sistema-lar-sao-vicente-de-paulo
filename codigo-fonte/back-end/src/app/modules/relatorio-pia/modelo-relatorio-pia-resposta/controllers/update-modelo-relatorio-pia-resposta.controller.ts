import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateModeloRelatorioPiaRespostaDto } from '../dtos/update-modelo-relatorio-pia-resposta.dto';
import { UpdateModeloRelatorioPiaRespostaService } from '../services/update-modelo-relatorio-pia-resposta.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-resposta')
@Controller('modelo-relatorio-pia-resposta')
@ApiBearerAuth()
export class UpdateModeloRelatorioPiaRespostaController {
	constructor(
		private updateModeloRelatorioPiaResposta: UpdateModeloRelatorioPiaRespostaService,
	) {}

	@Patch(':uid')
	@Roles(RoleModeloRelatorioPia.UPDATE)
	@ApiOperation({ summary: 'Atualiza um modelo de resposta pelo UID' })
	@ApiBody({
		type: UpdateModeloRelatorioPiaRespostaDto,
		description: 'Dados do modelo de resposta a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de resposta a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateModeloRelatorioPiaRespostaDto,
	): Promise<void> {
		await this.updateModeloRelatorioPiaResposta.execute(uid, data);
	}
}
