import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { NecessidadeNutricional } from '@prisma/client';
import { PrismaNecessidadeNutricionalRepository } from '../repositories/prisma/prisma-necessidade-nutricional.repository';
import { UpdateNecessidadeNutricionalDto } from '../dtos/update-necessidade-nutricional.dto';

@Injectable()
export class UpdateNecessidadeNutricionalService {
	constructor(
		private necessidadeNutricionalRepository: PrismaNecessidadeNutricionalRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateNecessidadeNutricionalDto,
	): Promise<NecessidadeNutricional | null> {
		const alreadyExists =
			await this.necessidadeNutricionalRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Necessidade Nutricional não encontrada');
		}

		const necessidadeNutricional =
			await this.necessidadeNutricionalRepository.update(
				data,
				alreadyExists,
			);

		return necessidadeNutricional;
	}
}
