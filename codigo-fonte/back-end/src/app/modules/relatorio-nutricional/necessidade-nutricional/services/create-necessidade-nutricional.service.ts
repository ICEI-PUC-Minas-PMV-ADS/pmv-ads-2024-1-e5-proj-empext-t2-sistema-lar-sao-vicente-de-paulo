import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaFichaNutricionalRepository } from '../../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { CreateNecessidadeNutricionalDto } from '../dtos/create-necessidade-nutricional.dto';
import { PrismaNecessidadeNutricionalRepository } from '../repositories/prisma/prisma-necessidade-nutricional.repository';

@Injectable()
export class CreateNecessidadeNutricionalService {
	constructor(
		private NecessidadeNutricionalRepository: PrismaNecessidadeNutricionalRepository,
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(data: CreateNecessidadeNutricionalDto) {
		const fichaNutricional = await this.fichaNutricionalRepository.findById(
			data.id_ficha_nutricional,
		);

		if (!fichaNutricional) {
			throw new AppError('Ficha Nutricional não encontrada');
		}

		const necessidadeNutricional =
			await this.NecessidadeNutricionalRepository.create({
				...data,
			});

		return necessidadeNutricional;
	}
}
