import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaCondutaNutricionalRepository } from '../repositories/prisma/prisma-conduta-nutricional.repository';

@Injectable()
export class DeleteCondutaNutricionalService {
	constructor(
		private condutaNutricionalRepository: PrismaCondutaNutricionalRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const condutaNutricional =
			await this.condutaNutricionalRepository.findByUid(uid);

		if (!condutaNutricional) {
			throw new AppError('Nenhuma Conduta Nutricional encontrada');
		}

		await this.condutaNutricionalRepository.delete(uid);
	}
}
