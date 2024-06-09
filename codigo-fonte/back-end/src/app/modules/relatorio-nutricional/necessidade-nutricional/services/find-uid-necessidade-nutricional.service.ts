import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { NecessidadeNutricional } from '@prisma/client';
import { PrismaNecessidadeNutricionalRepository } from '../repositories/prisma/prisma-necessidade-nutricional.repository';

@Injectable()
export class FindUidNecessidadeNutricionalService {
	constructor(
		private necessidadeNutricionalRepository: PrismaNecessidadeNutricionalRepository,
	) {}

	async execute(uid: string): Promise<NecessidadeNutricional | null> {
		const necessidadeNutricional =
			await this.necessidadeNutricionalRepository.findByUid(uid);

		if (!necessidadeNutricional) {
			throw new AppError('Nenhuma Necessidade Nutricional encontrada');
		}

		return necessidadeNutricional;
	}
}
