import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository';
import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { AppError } from '@utils/app-error';

@Injectable()
export class DeleteUsuarioService {
    constructor(private usuarioRepository: PrismaUsuarioRepository) { }

    async execute(uid: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findByUid(uid)

        if (!usuario) {
            throw new AppError('Nenhum usuário encontrado');
        }

        usuario.situacao = "INATIVO"

        await this.usuarioRepository.save(usuario)

        return usuario
    }
}
