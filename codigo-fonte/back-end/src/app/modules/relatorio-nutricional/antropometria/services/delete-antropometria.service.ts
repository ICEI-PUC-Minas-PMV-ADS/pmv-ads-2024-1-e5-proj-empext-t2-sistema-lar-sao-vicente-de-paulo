import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaAntropometriaRepository } from '../repositories/prisma/prisma-antropometria.repository';

@Injectable()
export class DeleteAntropometriaService {
	constructor(
		private AntropometriaRepository: PrismaAntropometriaRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const Antropometria = await this.AntropometriaRepository.findByUid(uid);

		if (!Antropometria) {
			throw new AppError('Nenhuma Antropometria encontrada');
		}

		await this.AntropometriaRepository.delete(uid);
	}
}
