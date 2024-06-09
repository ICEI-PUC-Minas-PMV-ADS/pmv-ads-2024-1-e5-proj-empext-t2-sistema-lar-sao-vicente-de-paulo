import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaNecessidadeNutricionalRepository } from '../repositories/prisma/prisma-necessidade-nutricional.repository';

@Injectable()
export class DeleteNecessidadeNutricionalService {
	constructor(
		private necessidadeNutricionalRepository: PrismaNecessidadeNutricionalRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const NecessidadeNutricional =
			await this.necessidadeNutricionalRepository.findByUid(uid);

		if (!NecessidadeNutricional) {
			throw new AppError('Nenhuma Necessidade nutricional encontrada');
		}

		await this.necessidadeNutricionalRepository.delete(uid);
	}
}
