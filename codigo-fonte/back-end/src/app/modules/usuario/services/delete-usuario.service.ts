import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUsuarioService {
    constructor(private prisma: PrismaService) {}

    async execute(uid: string): Promise<void> {
        await this.prisma.usuario.delete({
            where: {
                uid,
            },
        });

        return;
    }
}
