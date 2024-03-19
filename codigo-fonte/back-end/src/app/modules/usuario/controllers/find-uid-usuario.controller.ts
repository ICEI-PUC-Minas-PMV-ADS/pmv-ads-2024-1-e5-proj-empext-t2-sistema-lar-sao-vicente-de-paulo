import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../entities/usuario.entity';
import { AppResponse } from '@/common/utils/app-response';
import { FindUidUsuarioService } from '../services/find-uid-usuario.service';

@ApiTags('Usuarios')
@Controller('usuarios')
export class FindUidUsuarioController {
    constructor(private findUidUsuario: FindUidUsuarioService) { }

    @Get(':uid')
    @ApiOperation({ summary: 'Busca um usuário pelo UID' })
    @ApiParam({ name: 'uid', description: 'UID do usuário', type: String })
    @ApiOkResponse({
        description: 'Usuário encontrado',
        type: Usuario,
    })
    async handle(
        @Param('uid') uid: string,
    ): Promise<AppResponse<Usuario | null>> {
        const usuario = await this.findUidUsuario.execute(uid);

        return new AppResponse(usuario);
    }
}
