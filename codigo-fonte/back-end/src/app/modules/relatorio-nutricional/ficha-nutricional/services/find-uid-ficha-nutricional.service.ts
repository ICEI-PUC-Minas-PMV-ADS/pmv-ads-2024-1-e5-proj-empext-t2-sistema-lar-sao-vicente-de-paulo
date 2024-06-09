import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { FichaNutricional } from '@prisma/client';
import { PrismaFichaNutricionalRepository } from '../repositories/prisma/prisma-ficha-nutricional.repository';

@Injectable()
export class FindUidFichaNutricionalService {
	constructor(
		private FichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(uid: string): Promise<FichaNutricional | null> {
		const fichaNutricional =
			await this.FichaNutricionalRepository.findByUid(uid);

		if (!fichaNutricional) {
			throw new AppError('Nenhuma Ficha Nutricional encontrada');
		}

		return fichaNutricional;
	}
}
