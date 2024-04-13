import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Usuario } from '../entities/usuario.entity';
import { AppResponse } from '@/common/utils/app-response';
import { FindUidUsuarioService } from '../services/find-uid-usuario.service';
import { ApiFindResponse } from '@/common/decorators/api-find-response.decorator';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleUsuario } from '@/common/enums/roles';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class FindUidUsuarioController {
	constructor(private findUidUsuario: FindUidUsuarioService) {}

	@Get(':uid')
	@ApiOperation({ summary: 'Busca um usuário pelo UID' })
	@ApiParam({ name: 'uid', description: 'UID do usuário', type: String })
	@ApiFindResponse(Usuario)
	@ApiResponseError()
	async handle(
		@Param('uid') uid: string,
	): Promise<AppResponse<Usuario | null>> {
		const usuario = await this.findUidUsuario.execute(uid);

		return new AppResponse(usuario);
	}
}
