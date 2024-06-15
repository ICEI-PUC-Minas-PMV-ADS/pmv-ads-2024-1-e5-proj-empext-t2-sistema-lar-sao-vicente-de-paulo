import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { RegistroAntropometrico } from '@prisma/client';
import { PrismaRegistroAntropometricoRepository } from '../repositories/prisma/prisma-registro-antropometrico.repository';
import { UpdateRegistroAntropometricoDto } from '../dtos/update-registro-antropometrico.dto';

@Injectable()
export class UpdateRegistroAntropometricoService {
	constructor(
		private RegistroAntropometricoRepository: PrismaRegistroAntropometricoRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateRegistroAntropometricoDto,
	): Promise<RegistroAntropometrico | null> {
		const alreadyExists =
			await this.RegistroAntropometricoRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Antropometria não encontrada');
		}

		const Antropometria =
			await this.RegistroAntropometricoRepository.update(
				data,
				alreadyExists,
			);

		return Antropometria;
	}
}
