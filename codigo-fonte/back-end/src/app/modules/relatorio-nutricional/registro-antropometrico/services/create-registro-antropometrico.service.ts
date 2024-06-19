import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaFichaNutricionalRepository } from '../../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { PrismaRegistroAntropometricoRepository } from '../repositories/prisma/prisma-registro-antropometrico.repository';
import { CreateRegistroAntropometricoDto } from '../dtos/create-registro-antropometrico.dto';

@Injectable()
export class CreateRegistroAntropometricoService {
	constructor(
		private RegistroAntropometricoRepository: PrismaRegistroAntropometricoRepository,
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(data: CreateRegistroAntropometricoDto) {
		const fichaNutricional = await this.fichaNutricionalRepository.findById(
			data.id_ficha_nutricional,
		);

		if (!fichaNutricional) {
			throw new AppError('Ficha Nutricional não encontrada');
		}

		const antropometria =
			await this.RegistroAntropometricoRepository.create({
				...data,
			});

		return antropometria;
	}
}
