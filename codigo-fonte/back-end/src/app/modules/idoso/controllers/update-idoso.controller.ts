import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiParam,
	ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateIdosoService } from '../services/update-idoso.service';
import { UpdateIdosoDto } from '../dtos/update-idoso.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';

@ApiTags('idosos')
@Controller('idosos')
@ApiBearerAuth()
export class UpdateIdosoController {
	constructor(private updateIdoso: UpdateIdosoService) {}

	@Patch(':uid')
	@ApiOperation({
		summary: 'Atualiza os dados de um idoso com base no UID fornecido',
	})
	@ApiParam({ name: 'uid', description: 'O UID do idoso a ser atualizado' })
	@Roles(RoleIdoso.UPDATE)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateIdosoDto,
	): Promise<void> {
		await this.updateIdoso.execute(data, uid);

		return;
	}
}
