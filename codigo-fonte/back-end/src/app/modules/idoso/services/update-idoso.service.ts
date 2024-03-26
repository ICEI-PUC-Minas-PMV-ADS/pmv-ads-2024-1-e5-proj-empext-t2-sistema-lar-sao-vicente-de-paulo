import { PrismaIdosoRepository } from '@/repositories/prisma/prisma-idoso-repository';
import { Injectable } from '@nestjs/common';
import { Idoso } from '../entities/idoso.entity';
import { AppError } from '@utils/app-error';
import { UpdateIdosoDto } from '../dtos/update-idoso.dto';

@Injectable()
export class UpdateIdosoService {
	constructor(private idosoRepository: PrismaIdosoRepository) {}

	async execute(data: UpdateIdosoDto, uid: string): Promise<Idoso> {
		const idoso = await this.idosoRepository.findByUid(uid);

		if (!idoso) {
			throw new AppError('Nenhum idoso encontrado');
		}

		await this.idosoRepository.update(data, idoso);

		return idoso;
	}
}
