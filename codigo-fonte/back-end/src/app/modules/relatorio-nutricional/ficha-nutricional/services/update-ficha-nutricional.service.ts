import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaFichaNutricionalRepository } from '../repositories/prisma/prisma-ficha-nutricional.repository';
import { UpdateFichaNutricionalDto } from '../dtos/update-ficha-nutricional';
import { FichaNutricional } from '@prisma/client';

@Injectable()
export class UpdateFichaNutricionalService {
	constructor(
		private fichaNutricionalRepository: PrismaFichaNutricionalRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateFichaNutricionalDto,
	): Promise<FichaNutricional | null> {
		const alreadyExists =
			await this.fichaNutricionalRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Ficha Nutricional não encontrada');
		}

		const fichaNutricional = await this.fichaNutricionalRepository.update(
			data,
			alreadyExists,
		);

		return fichaNutricional;
	}
}
