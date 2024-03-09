import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class FindUidUsuarioService {
    constructor(private prisma: PrismaService) {}

    async execute(uid: string): Promise<Usuario | null> {
        const usuario = await this.prisma.usuario.findFirst({
            where: {
                uid,
            },
        });

        return usuario;
    }
}
