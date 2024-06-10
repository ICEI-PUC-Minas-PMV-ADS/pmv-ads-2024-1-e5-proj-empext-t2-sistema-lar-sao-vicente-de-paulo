import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaQuadroClinicoRepository } from '../repositories/prisma/prisma-quadro-clinico.repository';
import { QuadroClinico } from '@prisma/client';

@Injectable()
export class FindUidQuadroClinicoService {
	constructor(
		private quadroClinicoRepository: PrismaQuadroClinicoRepository,
	) {}

	async execute(uid: string): Promise<QuadroClinico | null> {
		const quadroClinico = await this.quadroClinicoRepository.findByUid(uid);

		if (!quadroClinico) {
			throw new AppError('Nenhum Quadro Clínico encontrado');
		}

		return quadroClinico;
	}
}
