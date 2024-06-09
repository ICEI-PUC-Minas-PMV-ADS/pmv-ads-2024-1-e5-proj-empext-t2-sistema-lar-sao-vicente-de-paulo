import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaCondutaNutricionalRepository } from '../repositories/prisma/prisma-conduta-nutricional.repository';
import { CondutaNutricional } from '@prisma/client';

@Injectable()
export class FindUidCondutaNutricionalService {
	constructor(
		private condutaNutricionalRepository: PrismaCondutaNutricionalRepository,
	) {}

	async execute(uid: string): Promise<CondutaNutricional | null> {
		const condutaNutricional =
			await this.condutaNutricionalRepository.findByUid(uid);

		if (!condutaNutricional) {
			throw new AppError('Nenhuma Conduta Nutricional encontrada');
		}

		return condutaNutricional;
	}
}
