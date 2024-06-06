import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { AntropometriaNutricional } from '@prisma/client';
import { PrismaAntropometriaRepository } from '../repositories/prisma/prisma-antropometria.repository';

@Injectable()
export class FindUidAntropometriaService {
	constructor(
		private AntropometriaRepository: PrismaAntropometriaRepository,
	) {}

	async execute(uid: string): Promise<AntropometriaNutricional | null> {
		const antropometria = await this.AntropometriaRepository.findByUid(uid);

		if (!antropometria) {
			throw new AppError('Nenhuma Antropometria encontrada');
		}

		return antropometria;
	}
}
