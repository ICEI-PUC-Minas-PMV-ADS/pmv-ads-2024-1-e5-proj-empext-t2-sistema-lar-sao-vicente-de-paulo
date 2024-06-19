import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { RegistroAntropometrico } from '@prisma/client';
import { PrismaRegistroAntropometricoRepository } from '../repositories/prisma/prisma-registro-antropometrico.repository';

@Injectable()
export class FindUidRegistroAntropometricoService {
	constructor(
		private RegistroAntropometricoRepository: PrismaRegistroAntropometricoRepository,
	) {}

	async execute(uid: string): Promise<RegistroAntropometrico | null> {
		const antropometria =
			await this.RegistroAntropometricoRepository.findByUid(uid);

		if (!antropometria) {
			throw new AppError('Nenhuma Antropometria encontrada');
		}

		return antropometria;
	}
}
