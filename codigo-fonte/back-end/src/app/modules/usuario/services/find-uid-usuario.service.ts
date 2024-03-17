import { Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository';
import { AppError } from '@utils/app-error';

@Injectable()
export class FindUidUsuarioService {
    constructor(private usuarioRepository: PrismaUsuarioRepository) { }

    async execute(uid: string): Promise<Usuario | null> {
        const usuario = await this.usuarioRepository.findByUid(uid);

        if (!usuario) {
            throw new AppError('Nenhum usuário encontrado');
        }

        return usuario;
    }
}
