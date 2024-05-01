import { Controller, Delete, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { DeleteResponsavelIdosoService } from '../services/delete-responsavel-idoso.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleIdoso } from '@/common/enums/roles';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@ApiTags('idosos')
@Controller('responsaveis')
@ApiBearerAuth()
export class DeleteResponsavelIdosoController {
	constructor(
		private deleteResponsavelIdoso: DeleteResponsavelIdosoService,
	) {}

	@Delete(':uid')
	@ApiOperation({ summary: 'Remove um responsável do idoso pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'O UID do responsável a ser removido',
	})
	@Roles(RoleIdoso.DELETE)
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteResponsavelIdoso.execute(uid);

		return;
	}
}
