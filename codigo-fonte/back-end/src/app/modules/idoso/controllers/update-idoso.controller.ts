import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UpdateIdosoService } from '../services/update-idoso.service';
import { UpdateIdosoDto } from '../dtos/update-idoso.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@ApiTags('idosos')
@Controller('idosos')
export class UpdateIdosoController {
	constructor(private updateIdoso: UpdateIdosoService) {}

	@Patch(':uid')
	@ApiOperation({
		summary: 'Atualiza os dados de um idoso com base no UID fornecido',
	})
	@ApiParam({ name: 'uid', description: 'O UID do idoso a ser atualizado' })
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateIdosoDto,
	): Promise<void> {
		await this.updateIdoso.execute(data, uid);

		return;
	}
}
