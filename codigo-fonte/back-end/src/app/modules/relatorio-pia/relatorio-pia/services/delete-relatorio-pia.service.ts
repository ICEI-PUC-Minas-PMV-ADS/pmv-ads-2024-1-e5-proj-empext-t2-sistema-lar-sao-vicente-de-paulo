import { Injectable } from '@nestjs/common';
import { PrismaRelatorioPiaRepository } from '../repositories/prisma/prisma-relatorio-pia.repository';
import { AppError } from '@utils/app-error';

@Injectable()
export class DeleteRelatorioPiaService {
	constructor(private relatorioPiaRepository: PrismaRelatorioPiaRepository) {}

	async execute(uid: string): Promise<void> {
		const relatorioPia = await this.relatorioPiaRepository.findByUid(uid);

		if (!relatorioPia) {
			throw new AppError('Relatório PIA não encontrado');
		}

		await this.relatorioPiaRepository.delete(uid);
	}
}
