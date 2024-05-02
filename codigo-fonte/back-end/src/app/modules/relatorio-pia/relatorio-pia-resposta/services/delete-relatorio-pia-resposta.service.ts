import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta.repository';

@Injectable()
export class DeleteRelatorioPiaRespostaService {
	constructor(
		private relatorioPiaRespostaRepository: PrismaRelatorioPiaRespostaRepository,
	) {}

	async execute(uid: string): Promise<void> {
		const relatorioPiaResposta =
			await this.relatorioPiaRespostaRepository.findByUid(uid);

		if (!relatorioPiaResposta) {
			throw new AppError('Relatório PIA Resposta não encontrado');
		}

		await this.relatorioPiaRespostaRepository.delete(uid);
	}
}
