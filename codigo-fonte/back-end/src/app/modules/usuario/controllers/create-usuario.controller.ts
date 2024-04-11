import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioService } from '../services/create-usuario.service';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleUsuario } from '@/common/enums/roles';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class CreateUsuarioController {
	constructor(private createUsuario: CreateUsuarioService) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra um novo usuário' })
	@ApiBody({
		type: CreateUsuarioDto,
		description: 'Dados do usuário a ser criado',
	})
	@Roles(RoleUsuario.CREATE)
	@ApiResponseError()
	async handle(@Body() data: CreateUsuarioDto): Promise<{ uid: string }> {
		const created = await this.createUsuario.execute(data);

		return { uid: created.usuario.uid };
	}
}
