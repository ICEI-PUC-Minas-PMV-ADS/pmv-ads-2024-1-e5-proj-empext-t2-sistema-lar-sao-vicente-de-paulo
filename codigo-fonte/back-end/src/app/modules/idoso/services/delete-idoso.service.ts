import { Injectable } from '@nestjs/common';
import { Idoso } from '../entities/idoso.entity';
import { AppError } from '@utils/app-error';
import { DeleteIdosoDto } from '../dtos/delete-idoso.dto';
import { PrismaIdosoRepository } from '../repositories/prisma/prisma-idoso-repository';

@Injectable()
export class DeleteIdosoService {
	constructor(private idosoRepository: PrismaIdosoRepository) {}

	async execute(data: DeleteIdosoDto, uid: string): Promise<Idoso> {
		const idoso = await this.idosoRepository.findByUid(uid);

		if (!idoso) {
			throw new AppError('Nenhum idoso encontrado');
		}

		const deletedIdoso = await this.idosoRepository.delete(data, idoso);

		return deletedIdoso;
	}
}
