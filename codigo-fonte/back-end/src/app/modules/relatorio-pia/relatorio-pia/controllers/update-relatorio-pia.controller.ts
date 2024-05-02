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

@ApiTags('relatorio-pia')
@Controller('relatorio-pia')
@ApiBearerAuth()
export class UpdateRelatorioPiaController {
	constructor(private updateRelatorioPia: UpdateRelatorioPiaService) {}

	@Patch(':uid')
	@ApiOperation({ summary: 'Atualiza um relatório PIA pelo UID' })
	@ApiBody({
		type: UpdateRelatorioPiaDto,
		description: 'Dados do relatório PIA a ser atualizado',
	})
	@ApiParam({
		name: 'uid',
		description: 'UID do relatório PIA a ser atualizado',
		type: 'string',
	})
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateRelatorioPiaDto,
	): Promise<void> {
		await this.updateRelatorioPia.execute(uid, data);
	}
}
