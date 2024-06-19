import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRegistroAntropometricoRepository } from '../repositories/prisma/prisma-registro-antropometrico.repository';

@Injectable()
export class DeleteRegistroAntropometricoService {
	constructor(
		private RegistroAntropometricoRepository: PrismaRegistroAntropometricoRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const Antropometria =
			await this.RegistroAntropometricoRepository.findByUid(uid);

		if (!Antropometria) {
			throw new AppError('Nenhuma Antropometria encontrada');
		}

		await this.RegistroAntropometricoRepository.delete(uid);
	}
}
