import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { UpdateRelatorioPiaService } from '../services/update-relatorio-pia.service';
import { UpdateRelatorioPiaDto } from '../dtos/update-relatorio-pia.dto';
import { RelatorioPia } from '../entities/relatorio-pia.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia')
@Controller('relatorio-pia')
@ApiBearerAuth()
export class UpdateRelatorioPiaController {
	constructor(private updateRelatorioPia: UpdateRelatorioPiaService) {}

	@Patch(':uid')
	@Roles(RoleRelatorioPia.UPDATE)
	@ApiOperation({ summary: 'Atualiza um Relatório PIA pelo UID' })
	@ApiBody({
		type: UpdateRelatorioPiaDto,
		description: 'Dados do Relatório PIA a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaDto,
	): Promise<RelatorioPia> {
		const relatorioPia = await this.updateRelatorioPia.execute(uid, data);

		return relatorioPia;
	}
}
