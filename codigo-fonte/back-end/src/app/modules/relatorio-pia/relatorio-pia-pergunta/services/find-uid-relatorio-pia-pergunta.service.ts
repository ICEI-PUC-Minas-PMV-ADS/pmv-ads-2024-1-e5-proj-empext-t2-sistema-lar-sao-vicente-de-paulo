import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaPerguntaRepository } from '../repositories/prisma/prisma-relatorio-pia-pergunta.repository';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';

@Injectable()
export class FindUidRelatorioPiaPerguntaService {
	constructor(
		private relatorioPiaPerguntaRepository: PrismaRelatorioPiaPerguntaRepository,
	) {}

	async execute(uid: string): Promise<RelatorioPiaPergunta | null> {
		const relatorioPiaPergunta =
			await this.relatorioPiaPerguntaRepository.findByUid(uid);

		if (!relatorioPiaPergunta) {
			throw new AppError('Relatório PIA pergunta não encontrado');
		}

		return relatorioPiaPergunta;
	}
}
