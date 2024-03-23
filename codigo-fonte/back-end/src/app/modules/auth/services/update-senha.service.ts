import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { AppError } from '@utils/app-error';
import { AuthUpdateSenhaDto } from '../dtos/update-senha.dto';
import { BcryptService } from '@/core/providers/bcrypt/bcrypt.service';

@Injectable()
export class AuthUpdateSenhaService {
    constructor(
        private prisma: PrismaService,
        private bcrypt: BcryptService,
    ) {}

    async execute(
        id_usuario: bigint,
        { senha_atual, senha_nova }: AuthUpdateSenhaDto,
    ) {
        if (senha_atual === senha_nova)
            throw new AppError('Senhas devem ser diferentes');

        const usuario = await this.prisma.usuario.findFirst({
            where: {
                id: id_usuario,
            },
        });

        if (!usuario) throw new AppError('Usuário não encontrado');

        const isMatch = await this.bcrypt.compareHash(
            senha_atual,
            usuario.senha,
        );

        if (!isMatch) throw new AppError('Senha atual inválida');

        const hash = await this.bcrypt.generateHash(senha_nova);

        await this.prisma.usuario.update({
            where: {
                id: id_usuario,
            },
            data: {
                senha: hash,
            },
        });

        return;
    }
}
