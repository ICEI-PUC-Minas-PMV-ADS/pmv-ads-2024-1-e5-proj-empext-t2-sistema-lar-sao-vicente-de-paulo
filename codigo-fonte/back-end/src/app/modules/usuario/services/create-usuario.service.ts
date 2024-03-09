import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { AppError } from '@/common/utils/app-error';

@Injectable()
export class CreateUsuarioService {
    constructor(private prisma: PrismaService) {}

    async execute(data: CreateUsuarioDto): Promise<void> {
        const hash = await bcrypt.hash(data.senha, 10);

        const usuarioExist = await this.prisma.usuario.findFirst({
            where: { email: data.email },
        });

        if (usuarioExist) throw new AppError('E-mail já cadastrado');

        await this.prisma.usuario.create({
            data: {
                ...data,
                senha: hash,
            },
        });

        return;
    }
}
