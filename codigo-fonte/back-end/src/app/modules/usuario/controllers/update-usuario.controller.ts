import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { UpdateUsuarioService } from '../services/update-usuario.service';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleUsuario } from '@/common/enums/roles';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class UpdateUsuarioController {
	constructor(private updateUsuario: UpdateUsuarioService) {}

	@Patch(':uid')
	@ApiOperation({ summary: 'Atualiza um usuário pelo UID' })
	@ApiParam({ name: 'uid', description: 'UID do usuário', type: String })
	@Roles(RoleUsuario.UPDATE)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
		@Body() data: UpdateUsuarioDto,
	): Promise<void> {
		await this.updateUsuario.execute(uid, data);

		return;
	}
}
