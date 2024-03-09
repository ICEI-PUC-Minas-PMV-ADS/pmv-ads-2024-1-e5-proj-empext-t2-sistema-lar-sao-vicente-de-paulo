import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';

@Injectable()
export class UpdateUsuarioService {
    constructor(private prisma: PrismaService) {}

    async execute(uid: string, data: UpdateUsuarioDto): Promise<void> {
        await this.prisma.usuario.update({
            where: {
                uid,
            },
            data,
        });

        return;
    }
}
