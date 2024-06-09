import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaFichaNutricionalRepository } from '../../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { CreateAntropometriaDto } from '../dtos/create-antropometria.dto';
import { PrismaAntropometriaRepository } from '../repositories/prisma/prisma-antropometria.repository';

@Injectable()
export class CreateAntropometriaService {
	constructor(
		private AntropometriaRepository: PrismaAntropometriaRepository,
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(data: CreateAntropometriaDto) {
		const fichaNutricional = await this.fichaNutricionalRepository.findById(
			data.id_ficha_nutricional,
		);

		if (!fichaNutricional) {
			throw new AppError('Ficha Nutricional não encontrada');
		}

		const antropometria = await this.AntropometriaRepository.create({
			...data,
		});

		return antropometria;
	}
}
