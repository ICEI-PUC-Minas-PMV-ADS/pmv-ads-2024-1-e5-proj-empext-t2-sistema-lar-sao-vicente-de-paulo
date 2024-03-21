import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUsuarioService } from '../services/delete-usuario.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class DeleteUsuarioController {
    constructor(private deleteUsuario: DeleteUsuarioService) { }

    @Delete(':uid')
    @ApiOperation({ summary: 'Exclui um usuário pelo UID' })
    @ApiParam({ name: 'uid', description: 'UID do usuário a ser excluído', type: 'string' })
    async handle(@Param('uid') uid: string): Promise<void> {
        await this.deleteUsuario.execute(uid);

        return;
    }
}
