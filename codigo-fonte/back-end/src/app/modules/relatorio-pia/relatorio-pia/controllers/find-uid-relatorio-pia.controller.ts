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

@ApiTags('relatorio-pia')
@Controller('relatorio-pia')
@ApiBearerAuth()
export class FindUidRelatorioPiaController {
	constructor(private findUidRelatorioPia: FindUidRelatorioPiaService) {}

	@Get(':uid')
	@ApiOperation({ summary: 'Busca um relatório PIA pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA a ser buscado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<RelatorioPia | null> {
		const RelatorioPia = await this.findUidRelatorioPia.execute(uid);

		return RelatorioPia;
	}
}
