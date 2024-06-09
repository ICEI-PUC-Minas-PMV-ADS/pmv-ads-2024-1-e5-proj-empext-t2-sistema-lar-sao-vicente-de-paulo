import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { CondutaNutricional } from '@prisma/client';
import { PrismaCondutaNutricionalRepository } from '../repositories/prisma/prisma-conduta-nutricional.repository';
import { UpdateCondutaNutricionalDto } from '../dtos/update-conduta-nutricional.dto';

@Injectable()
export class UpdateCondutaNutricionalService {
	constructor(
		private condutaNutricionalRepository: PrismaCondutaNutricionalRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateCondutaNutricionalDto,
	): Promise<CondutaNutricional | null> {
		const alreadyExists =
			await this.condutaNutricionalRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Conduta Nutricional não encontrada');
		}

		const condutaNutricional =
			await this.condutaNutricionalRepository.update(data, alreadyExists);

		return condutaNutricional;
	}
}
