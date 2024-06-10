import { Injectable } from '@nestjs/common';
import { PrismaCondutaNutricionalRepository } from '../repositories/prisma/prisma-conduta-nutricional.repository';
import { AppError } from '@utils/app-error';
import { CreateCondutaNutricionalDto } from '../dtos/create-conduta-nutricional.dto';
import { PrismaFichaNutricionalRepository } from '../../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';

@Injectable()
export class CreateCondutaNutricionalService {
	constructor(
		private condutaNutricionalRepository: PrismaCondutaNutricionalRepository,
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(data: CreateCondutaNutricionalDto) {
		const fichaNutricional = await this.fichaNutricionalRepository.findById(
			data.id_ficha_nutricional,
		);

		if (!fichaNutricional) {
			throw new AppError('Ficha Nutricional não encontrada');
		}

		const condutaNutricional =
			await this.condutaNutricionalRepository.create({
				...data,
			});

		return condutaNutricional;
	}
}
