import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { DeleteIdosoService } from '../services/delete-idoso.service';
import { DeleteIdosoDto } from '../dtos/delete-idoso.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@ApiTags('idosos')
@Controller('idosos')
export class DeleteIdosoController {
	constructor(private deleteIdoso: DeleteIdosoService) {}

	@Delete(':uid')
	@ApiOperation({ summary: 'Remove um idoso pelo UID' })
	@ApiParam({ name: 'uid', description: 'O UID do idoso a ser removido' })
	@ApiBody({
		type: DeleteIdosoDto,
		description: 'Dados adicionais para a exclusão do idoso',
	})
	@ApiResponseError()
	async handle(
		@Body() data: DeleteIdosoDto,
		@Param('uid') uid: string,
	): Promise<void> {
		await this.deleteIdoso.execute(data, uid);

		return;
	}
}
