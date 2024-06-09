import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaSemiologiaNutricionalRepository } from '../repositories/prisma/prisma-Semiologia-nutricional.repository';

@Injectable()
export class DeleteSemiologiaNutricionalService {
	constructor(
		private semiologiaNutricionalRepository: PrismaSemiologiaNutricionalRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const semiologiaNutricional =
			await this.semiologiaNutricionalRepository.findByUid(uid);

		if (!semiologiaNutricional) {
			throw new AppError('Nenhuma semiologia nutricional encontrada');
		}

		await this.semiologiaNutricionalRepository.delete(uid);
	}
}
