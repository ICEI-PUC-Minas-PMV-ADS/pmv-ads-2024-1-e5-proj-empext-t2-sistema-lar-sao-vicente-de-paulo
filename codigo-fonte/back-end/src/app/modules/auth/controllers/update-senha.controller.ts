import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUpdateSenhaService } from '../services/update-senha.service';
import { AuthUser, IAuthUser } from '@/common/decorators/auth.decorator';
import { AuthUpdateSenhaDto } from '../dtos/update-senha.dto';

@ApiTags('auth')
@Controller('auth/update-senha')
@ApiBearerAuth()
export class AuthUpdateSenhaController {
    constructor(private redefinirSenha: AuthUpdateSenhaService) {}

    @Post()
    async handle(
        @Body() data: AuthUpdateSenhaDto,
        @AuthUser() user: IAuthUser,
    ) {
        await this.redefinirSenha.execute(user.usuario.id, data);

        return;
    }
}
