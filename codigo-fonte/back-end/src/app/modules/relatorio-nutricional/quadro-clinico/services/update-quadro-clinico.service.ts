import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { QuadroClinico } from '@prisma/client';
import { PrismaQuadroClinicoRepository } from '../repositories/prisma/prisma-quadro-clinico.repository';
import { UpdateQuadroClinicoDto } from '../dtos/update-quadro-clinico.dto';

@Injectable()
export class UpdateQuadroClinicoService {
	constructor(
		private quadroClinicoRepository: PrismaQuadroClinicoRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateQuadroClinicoDto,
	): Promise<QuadroClinico | null> {
		const alreadyExists = await this.quadroClinicoRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Quadro Clínico não encontrado');
		}

		const quadroClinico = await this.quadroClinicoRepository.update(
			data,
			alreadyExists,
		);

		return quadroClinico;
	}
}
