import { Injectable } from '@nestjs/common';
import { PrismaQuadroClinicoRepository } from '../repositories/prisma/prisma-quadro-clinico.repository';
import { AppError } from '@utils/app-error';
import { CreateQuadroClinicoDto } from '../dtos/create-quadro-clinico.dto';
import { PrismaFichaNutricionalRepository } from '../../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';

@Injectable()
export class CreateQuadroClinicoService {
	constructor(
		private quadroClinicoRepository: PrismaQuadroClinicoRepository,
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(data: CreateQuadroClinicoDto) {
		const fichaNutricional = await this.fichaNutricionalRepository.findById(
			data.id_ficha_nutricional,
		);

		if (!fichaNutricional) {
			throw new AppError('Ficha Nutricional não encontrada');
		}

		const quadroClinico = await this.quadroClinicoRepository.create({
			...data,
		});

		return quadroClinico;
	}
}
