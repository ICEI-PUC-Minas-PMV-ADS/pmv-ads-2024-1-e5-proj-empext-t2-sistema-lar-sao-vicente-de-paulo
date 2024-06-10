import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaFichaNutricionalRepository } from '../repositories/prisma/prisma-ficha-nutricional.repository';

@Injectable()
export class DeleteFichaNutricionalService {
	constructor(
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const fichaNutricional =
			await this.fichaNutricionalRepository.findByUid(uid);

		if (!fichaNutricional) {
			throw new AppError('Nenhuma ficha nutricional encontrada');
		}

		await this.fichaNutricionalRepository.delete(uid);
	}
}
