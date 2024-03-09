import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUsuarioService } from '../services/delete-usuario.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleUsuario } from '@/common/enums/roles';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class DeleteUsuarioController {
    constructor(private deleteUsuario: DeleteUsuarioService) {}

    @Delete(':uid')
    @Roles(RoleUsuario.DELETE)
    async handle(@Param('uid') uid: string): Promise<void> {
        await this.deleteUsuario.execute(uid);

        return;
    }
}
