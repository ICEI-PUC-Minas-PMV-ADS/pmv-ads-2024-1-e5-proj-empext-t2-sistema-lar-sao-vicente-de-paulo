import { PrismaUsuarioRepository } from '@/app/modules/usuario/repositories/prisma/prisma-usuario-repository';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';

@Injectable()
export class DeleteUsuarioService {
	constructor(private usuarioRepository: PrismaUsuarioRepository) {}

	async execute(uid: string): Promise<void> {
		const usuario = await this.usuarioRepository.findByUid(uid);

		if (!usuario) {
			throw new AppError('Nenhum usuário encontrado');
		}

		await this.usuarioRepository.delete(uid);

		return;
	}
}
