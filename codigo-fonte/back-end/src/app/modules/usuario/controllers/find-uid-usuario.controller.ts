import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../entities/usuario.entity';
import { AppResponse } from '@/common/utils/app-response';
import { FindUidUsuarioService } from '../services/find-uid-usuario.service';

@ApiTags('usuarios')
@Controller('usuarios')
export class FindUidUsuarioController {
    constructor(private findUidUsuario: FindUidUsuarioService) {}

    @Get(':uid')
    @ApiOkResponse({
        type: Usuario,
    })
    async handle(
        @Param('uid') uid: string,
    ): Promise<AppResponse<Usuario | null>> {
        const usuario = await this.findUidUsuario.execute(uid);

        return new AppResponse(usuario);
    }
}
