import { Injectable } from '@nestjs/common';
import { PrismaSemiologiaNutricionalRepository } from '../repositories/prisma/prisma-Semiologia-nutricional.repository';
import { AppError } from '@utils/app-error';
import { CreateSemiologiaNutricionalDto } from '../dtos/create-semiologia-nutricional.dto';
import { PrismaFichaNutricionalRepository } from '../../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';

@Injectable()
export class CreateSemiologiaNutricionalService {
	constructor(
		private semiologiaNutricionalRepository: PrismaSemiologiaNutricionalRepository,
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(data: CreateSemiologiaNutricionalDto) {
		const fichaNutricional = await this.fichaNutricionalRepository.findById(
			data.id_ficha_nutricional,
		);

		if (!fichaNutricional) {
			throw new AppError('Ficha Nutricional não encontrada');
		}

		const semiologiaNutricional =
			await this.semiologiaNutricionalRepository.create({
				...data,
			});

		return semiologiaNutricional;
	}
}
