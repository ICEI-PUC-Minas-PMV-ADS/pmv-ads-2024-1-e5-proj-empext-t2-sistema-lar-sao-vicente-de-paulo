import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioService } from '../services/create-usuario.service';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { ApiResponseError } from '@/common/decorators/api-response-error.decorator';

@ApiTags('usuarios')
@Controller('usuarios')
export class CreateUsuarioController {
	constructor(private createUsuario: CreateUsuarioService) {}

	@Post()
	@ApiOperation({ summary: 'Cadastra um novo usuário' })
	@ApiBody({
		type: CreateUsuarioDto,
		description: 'Dados do usuário a ser criado',
	})
	@ApiResponseError()
	async handle(@Body() data: CreateUsuarioDto): Promise<void> {
		await this.createUsuario.execute(data);

		return;
	}
}
