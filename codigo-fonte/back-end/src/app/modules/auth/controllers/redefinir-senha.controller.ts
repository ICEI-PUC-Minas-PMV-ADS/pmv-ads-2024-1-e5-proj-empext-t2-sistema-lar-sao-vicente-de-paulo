import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators/is-public.decorator';
import { AuthRedefinirSenhaService } from '../services/redefinir-senha.service';
import { AuthRedefinirSenhaDto } from '../dtos/redefinir-senha.dto';

@ApiTags('auth')
@Controller('auth/redefinir-senha')
export class AuthRedefinirSenhaController {
    constructor(private redefinirSenha: AuthRedefinirSenhaService) {}

    @Post()
    @Public()
    async handle(@Body() data: AuthRedefinirSenhaDto) {
        await this.redefinirSenha.execute(data);

        return;
    }
}
