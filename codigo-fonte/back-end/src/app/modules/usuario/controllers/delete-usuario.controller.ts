import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUsuarioService } from '../services/delete-usuario.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class DeleteUsuarioController {
    constructor(private deleteUsuario: DeleteUsuarioService) {}

    @Delete(':uid')
    async handle(@Param('uid') uid: string): Promise<void> {
        await this.deleteUsuario.execute(uid);

        return;
    }
}
