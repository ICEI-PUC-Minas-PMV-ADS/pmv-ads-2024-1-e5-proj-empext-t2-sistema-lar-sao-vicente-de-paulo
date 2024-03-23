import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { BcryptService } from '@/core/providers/bcrypt/bcrypt.service';
import { AuthDefinirSenhaDto } from '../dtos/definir-senha.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { AppError } from '@utils/app-error';

interface IContentCodigo {
    id_usuario: bigint;
    id_empresa: bigint;
}

@Injectable()
export class AuthDefinirSenhaService {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private prisma: PrismaService,
        private bcrypt: BcryptService,
    ) {}

    async execute({ codigo, senha }: AuthDefinirSenhaDto) {
        const codigoExist = await this.redis.get(codigo);

        if (!codigoExist) throw new AppError('Código inválido');

        const contentCodigo = JSON.parse(codigoExist) as IContentCodigo;

        const hash = await this.bcrypt.generateHash(senha);

        await this.prisma.usuario.update({
            where: {
                id: contentCodigo.id_usuario,
            },
            data: {
                senha: hash,
            },
        });

        await this.redis.del(codigo);

        return;
    }
}
