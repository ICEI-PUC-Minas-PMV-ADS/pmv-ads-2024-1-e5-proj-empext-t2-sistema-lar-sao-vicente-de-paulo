import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioService } from '../services/update-usuario.service';
import { RoleUsuario } from '@/common/enums/roles';
import { Roles } from '@/common/decorators/roles.decorator';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class UpdateUsuarioController {
    constructor(private updateUsuario: UpdateUsuarioService) {}

    @Put(':uid')
    @Roles(RoleUsuario.UPDATE)
    async handle(
        @Param('uid') uid: string,
        @Body() data: UpdateUsuarioDto,
    ): Promise<void> {
        await this.updateUsuario.execute(uid, data);

        return;
    }
}
