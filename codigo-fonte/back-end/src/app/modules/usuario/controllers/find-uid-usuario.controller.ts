import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../entities/usuario.entity';
import { AppResponse } from '@/common/utils/app-response';
import { FindUidUsuarioService } from '../services/find-uid-usuario.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleUsuario } from '@/common/enums/roles';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class FindUidUsuarioController {
    constructor(private findUidUsuario: FindUidUsuarioService) {}

    @Get(':uid')
    @ApiOkResponse({
        type: Usuario,
    })
    @Roles(RoleUsuario.FIND)
    async handle(
        @Param('uid') uid: string,
    ): Promise<AppResponse<Usuario | null>> {
        const usuario = await this.findUidUsuario.execute(uid);

        return new AppResponse(usuario);
    }
}
