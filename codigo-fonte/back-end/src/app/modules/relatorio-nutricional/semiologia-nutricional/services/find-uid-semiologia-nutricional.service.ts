import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaSemiologiaNutricionalRepository } from '../repositories/prisma/prisma-Semiologia-nutricional.repository';
import { SemiologiaNutricional } from '@prisma/client';

@Injectable()
export class FindUidSemiologiaNutricionalService {
	constructor(
		private semiologiaNutricionalRepository: PrismaSemiologiaNutricionalRepository,
	) {}

	async execute(uid: string): Promise<SemiologiaNutricional | null> {
		const semiologiaNutricional =
			await this.semiologiaNutricionalRepository.findByUid(uid);

		if (!semiologiaNutricional) {
			throw new AppError('Nenhuma Semiologia Nutricional encontrada');
		}

		return semiologiaNutricional;
	}
}
