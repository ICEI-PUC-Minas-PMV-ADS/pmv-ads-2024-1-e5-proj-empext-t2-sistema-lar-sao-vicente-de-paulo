import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatórioPiaPerguntaRepository } from '../repositories/prisma/prisma-relatorio-pia-pergunta.repository';

@Injectable()
export class DeleteRelatorioPiaPerguntaService {
	constructor(
		private relatorioPiaPerguntaRepository: PrismaRelatórioPiaPerguntaRepository,
	) {}

	async execute(uid: string): Promise<void> {
		const relatorioPiaPergunta =
			await this.relatorioPiaPerguntaRepository.findByUid(uid);

		if (!relatorioPiaPergunta) {
			throw new AppError('Relatório PIA Pergunta não encontrado');
		}

		await this.relatorioPiaPerguntaRepository.delete(uid);

		return;
	}
}
