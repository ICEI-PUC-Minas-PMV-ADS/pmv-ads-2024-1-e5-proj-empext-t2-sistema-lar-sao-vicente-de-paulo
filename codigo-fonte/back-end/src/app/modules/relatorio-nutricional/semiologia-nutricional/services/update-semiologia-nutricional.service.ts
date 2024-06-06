import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { SemiologiaNutricional } from '@prisma/client';
import { PrismaSemiologiaNutricionalRepository } from '../repositories/prisma/prisma-Semiologia-nutricional.repository';
import { UpdateSemiologiaNutricionalDto } from '../dtos/update-semiologia-nutricional.dto';

@Injectable()
export class UpdateSemiologiaNutricionalService {
	constructor(
		private semiologiaNutricionalRepository: PrismaSemiologiaNutricionalRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateSemiologiaNutricionalDto,
	): Promise<SemiologiaNutricional | null> {
		const alreadyExists =
			await this.semiologiaNutricionalRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Semiologia Nutricional não encontrada');
		}

		const semiologiaNutricional =
			await this.semiologiaNutricionalRepository.update(
				data,
				alreadyExists,
			);

		return semiologiaNutricional;
	}
}
