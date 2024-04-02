import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUsuarioService } from '../services/delete-usuario.service';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleUsuario } from '@/common/enums/roles';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class DeleteUsuarioController {
	constructor(private deleteUsuario: DeleteUsuarioService) {}

	@Delete(':uid')
	@ApiOperation({ summary: 'Exclui um usuário pelo UID' })
	@ApiParam({
		name: 'uid',
		description: 'UID do usuário a ser excluído',
		type: 'string',
	})
	@Roles(RoleUsuario.DELETE)
	@ApiResponseError()
	async handle(@Param('uid') uid: string): Promise<void> {
		await this.deleteUsuario.execute(uid);

		return;
	}
}
