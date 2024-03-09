import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioService } from '../services/create-usuario.service';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class CreateUsuarioController {
    constructor(private createUsuario: CreateUsuarioService) {}

    @Post()
    async handle(@Body() data: CreateUsuarioDto): Promise<void> {
        await this.createUsuario.execute(data);

        return;
    }
}
