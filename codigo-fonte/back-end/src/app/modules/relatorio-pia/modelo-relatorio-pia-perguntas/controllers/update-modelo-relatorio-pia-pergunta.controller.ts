import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateModeloRelatorioPiaPerguntaService } from '../services/update-modelo-relatorio-pia-pergunta.service';
import { UpdateModeloRelatorioPiaPerguntaDto } from '../dtos/update-modelo-relatorio-pia-pergunta.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-pergunta')
@Controller('modelo-relatorio-pia-pergunta')
@ApiBearerAuth()
export class UpdateModeloRelatorioPiaPerguntaController {
	constructor(
		private updateModeloRelatorioPiaPergunta: UpdateModeloRelatorioPiaPerguntaService,
	) {}

	@Patch(':uid')
	@Roles(RoleModeloRelatorioPia.UPDATE)
	@ApiOperation({ summary: 'Atualiza um modelo de pergunta pelo UID' })
	@ApiBody({
		type: UpdateModeloRelatorioPiaPerguntaDto,
		description: 'Dados do modelo de pergunta a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de pergunta a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateModeloRelatorioPiaPerguntaDto,
	): Promise<void> {
		await this.updateModeloRelatorioPiaPergunta.execute(uid, data);
	}
}
