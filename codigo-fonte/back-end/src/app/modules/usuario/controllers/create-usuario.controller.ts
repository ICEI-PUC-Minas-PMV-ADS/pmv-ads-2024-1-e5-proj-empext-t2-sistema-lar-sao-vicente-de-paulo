import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioService } from '../services/create-usuario.service';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class CreateUsuarioController {
    constructor(private createUsuario: CreateUsuarioService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiBody({ type: CreateUsuarioDto, description: 'Dados do usuário a ser criado' })
    async handle(@Body() data: CreateUsuarioDto): Promise<void> {
        await this.createUsuario.execute(data);

        return;
    }
}
