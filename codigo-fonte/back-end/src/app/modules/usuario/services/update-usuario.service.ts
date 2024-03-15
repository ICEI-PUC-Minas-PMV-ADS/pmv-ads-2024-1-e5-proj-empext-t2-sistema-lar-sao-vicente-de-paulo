import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository';
import { Usuario } from '@prisma/client';
import { AppError } from '@utils/app-error';

@Injectable()
export class UpdateUsuarioService {
    constructor(private usuarioRepository: PrismaUsuarioRepository) { }

    async execute(uid: string, data: UpdateUsuarioDto): Promise<Usuario | null> {
        const usuario = await this.usuarioRepository.update(uid, data);

        if (!usuario) {
            throw new AppError('Nenhum usuário encontrado');
        }

        return usuario;
    }
}
