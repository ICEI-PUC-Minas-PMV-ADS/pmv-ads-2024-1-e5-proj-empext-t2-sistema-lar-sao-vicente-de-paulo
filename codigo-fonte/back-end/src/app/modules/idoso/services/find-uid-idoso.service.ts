import { PrismaIdosoRepository } from '@/repositories/prisma/prisma-idoso-repository';
import { Injectable } from '@nestjs/common';
import { Idoso } from '../entities/idoso.entity';
import { AppError } from '@utils/app-error';

@Injectable()
export class FindUidIdosoService {
	constructor(private idosoRepository: PrismaIdosoRepository) {}

	async execute(uid: string): Promise<Idoso | null> {
		const idoso = await this.idosoRepository.findByUid(uid);

		if (!idoso) {
			throw new AppError('Nenhum idoso encontrado');
		}

		return idoso;
	}
}
