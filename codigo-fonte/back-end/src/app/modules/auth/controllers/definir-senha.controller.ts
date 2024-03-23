import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators/is-public.decorator';
import { AuthDefinirSenhaService } from '../services/definir-senha.service';
import { AuthDefinirSenhaDto } from '../dtos/definir-senha.dto';

@ApiTags('auth')
@Controller('auth/definir-senha')
export class AuthDefinirSenhaController {
    constructor(private definirSenha: AuthDefinirSenhaService) {}

    @Post()
    @Public()
    async handle(@Body() data: AuthDefinirSenhaDto) {
        await this.definirSenha.execute(data);

        return;
    }
}
