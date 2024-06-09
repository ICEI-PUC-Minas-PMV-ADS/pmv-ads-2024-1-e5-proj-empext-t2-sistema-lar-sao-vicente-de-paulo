import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { AntropometriaNutricional } from '@prisma/client';
import { PrismaAntropometriaRepository } from '../repositories/prisma/prisma-antropometria.repository';
import { UpdateAntropometriaDto } from '../dtos/update-antropometria.dto';

@Injectable()
export class UpdateAntropometriaService {
	constructor(
		private AntropometriaRepository: PrismaAntropometriaRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateAntropometriaDto,
	): Promise<AntropometriaNutricional | null> {
		const alreadyExists = await this.AntropometriaRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Antropometria não encontrada');
		}

		const Antropometria = await this.AntropometriaRepository.update(
			data,
			alreadyExists,
		);

		return Antropometria;
	}
}
