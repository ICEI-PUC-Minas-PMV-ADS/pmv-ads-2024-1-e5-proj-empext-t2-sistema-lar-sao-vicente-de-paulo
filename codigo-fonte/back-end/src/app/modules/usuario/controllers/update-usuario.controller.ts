import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioService } from '../services/update-usuario.service';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class UpdateUsuarioController {
    constructor(private updateUsuario: UpdateUsuarioService) {}

    @Put(':uid')
    async handle(
        @Param('uid') uid: string,
        @Body() data: UpdateUsuarioDto,
    ): Promise<void> {
        await this.updateUsuario.execute(uid, data);

        return;
    }
}
