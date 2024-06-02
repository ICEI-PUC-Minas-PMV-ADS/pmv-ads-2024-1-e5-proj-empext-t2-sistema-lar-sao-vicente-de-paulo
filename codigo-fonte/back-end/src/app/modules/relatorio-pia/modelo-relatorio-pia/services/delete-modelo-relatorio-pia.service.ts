import { Injectable } from '@nestjs/common';
import { PrismaModeloRelatorioPiaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia.repository';
import { AppError } from '@utils/app-error';

@Injectable()
export class DeleteModeloRelatorioPiaService {
	constructor(
		private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const modeloRelatorioPia =
			await this.modeloRelatorioPiaRepository.findByUid(uid);

		if (!modeloRelatorioPia) {
			throw new AppError('Modelo de Relatório PIA não encontrado');
		}

		await this.modeloRelatorioPiaRepository.delete(uid);
	}
}
