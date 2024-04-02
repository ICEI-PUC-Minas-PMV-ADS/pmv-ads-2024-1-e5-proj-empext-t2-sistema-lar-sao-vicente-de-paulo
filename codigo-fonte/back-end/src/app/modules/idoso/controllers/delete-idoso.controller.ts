import { Body, Controller, Delete, Param } from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiParam,
	ApiBody,
	ApiBearerAuth,
} from '@nestjs/swagger';
import { DeleteIdosoService } from '../services/delete-idoso.service';
import { DeleteIdosoDto } from '../dtos/delete-idoso.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';

@ApiTags('idosos')
@Controller('idosos')
@ApiBearerAuth()
export class DeleteIdosoController {
	constructor(private deleteIdoso: DeleteIdosoService) {}

	@Delete(':uid')
	@ApiOperation({ summary: 'Remove um idoso pelo UID' })
	@ApiParam({ name: 'uid', description: 'O UID do idoso a ser removido' })
	@ApiBody({
		type: DeleteIdosoDto,
		description: 'Dados adicionais para a exclusão do idoso',
	})
	@Roles(RoleIdoso.DELETE)
	@ApiResponseError()
	async handle(
		@Body() data: DeleteIdosoDto,
		@Param('uid') uid: string,
	): Promise<void> {
		await this.deleteIdoso.execute(data, uid);

		return;
	}
}
