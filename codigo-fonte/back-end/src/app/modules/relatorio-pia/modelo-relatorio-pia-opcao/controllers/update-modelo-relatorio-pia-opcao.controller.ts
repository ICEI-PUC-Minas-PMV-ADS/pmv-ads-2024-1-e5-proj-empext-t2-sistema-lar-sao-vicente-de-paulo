import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateModeloRelatorioPiaOpcaoDto } from '../dtos/update-modelo-relatorio-pia-opcao.dto';
import { UpdateModeloRelatorioPiaOpcaoService } from '../services/update-modelo-relatorio-pia-opcao.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleModeloRelatorioPia } from '@/common/enums/roles';

@ApiTags('modelo-relatorio-pia-resposta-opcao')
@Controller('modelo-relatorio-pia-resposta-opcao')
@ApiBearerAuth()
export class UpdateModeloRelatorioPiaOpcaoController {
	constructor(
		private updateModeloRelatorioPiaOpcao: UpdateModeloRelatorioPiaOpcaoService,
	) {}

	@Patch(':uid')
	@Roles(RoleModeloRelatorioPia.UPDATE)
	@ApiOperation({
		summary: 'Atualiza um modelo de opção de resposta pelo UID',
	})
	@ApiBody({
		type: UpdateModeloRelatorioPiaOpcaoDto,
		description: 'Dados do modelo de opção de resposta a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do modelo de opção de resposta a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateModeloRelatorioPiaOpcaoDto,
	): Promise<void> {
		await this.updateModeloRelatorioPiaOpcao.execute(uid, data);
	}
}
