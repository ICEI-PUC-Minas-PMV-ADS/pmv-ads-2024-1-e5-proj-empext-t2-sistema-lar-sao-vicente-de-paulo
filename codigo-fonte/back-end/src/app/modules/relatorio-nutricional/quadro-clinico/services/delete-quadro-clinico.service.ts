import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaQuadroClinicoRepository } from '../repositories/prisma/prisma-quadro-clinico.repository';

@Injectable()
export class DeleteQuadroClinicoService {
	constructor(
		private quadroClinicoRepository: PrismaQuadroClinicoRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const quadroClinico = await this.quadroClinicoRepository.findByUid(uid);

		if (!quadroClinico) {
			throw new AppError('Nenhum Quadro Clínico encontrado');
		}

		await this.quadroClinicoRepository.delete(uid);
	}
}
