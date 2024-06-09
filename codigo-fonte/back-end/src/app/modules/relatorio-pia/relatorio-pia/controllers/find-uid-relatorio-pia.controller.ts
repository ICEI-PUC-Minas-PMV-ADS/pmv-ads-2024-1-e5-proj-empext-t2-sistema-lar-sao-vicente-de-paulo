import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { FindUidRelatorioPiaService } from '../services/find-uid-relatorio-pia.service';
import { RelatorioPia } from '../entities/relatorio-pia.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleRelatorioPia } from '@/common/enums/roles';

@ApiTags('relatorio-pia')
@Controller('relatorio-pia')
@ApiBearerAuth()
export class FindUidRelatorioPiaController {
	constructor(private findUidRelatorioPia: FindUidRelatorioPiaService) {}

	@Get(':uid')
	@Roles(RoleRelatorioPia.FIND)
	@ApiOperation({ summary: 'Busca um Relatório PIA pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do Relatório PIA a ser buscado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<RelatorioPia | null> {
		const RelatorioPia = await this.findUidRelatorioPia.execute(uid);

		return RelatorioPia;
	}
}
