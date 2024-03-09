import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioService } from '../services/create-usuario.service';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleUsuario } from '@/common/enums/roles';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class CreateUsuarioController {
    constructor(private createUsuario: CreateUsuarioService) {}

    @Post()
    @Roles(RoleUsuario.CREATE)
    async handle(@Body() data: CreateUsuarioDto): Promise<void> {
        await this.createUsuario.execute(data);

        return;
    }
}
