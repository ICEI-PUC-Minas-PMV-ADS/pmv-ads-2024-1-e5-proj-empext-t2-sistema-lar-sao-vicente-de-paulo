import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta.repository';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';

@Injectable()
export class FindUidRelatorioPiaRespostaService {
	constructor(
		private relatorioPiaRespostaRepository: PrismaRelatorioPiaRespostaRepository,
	) {}

	async execute(uid: string): Promise<RelatorioPiaResposta | null> {
		const relatorioPiaResposta =
			await this.relatorioPiaRespostaRepository.findByUid(uid);

		if (!relatorioPiaResposta) {
			throw new AppError('Relatório PIA Resposta não encontrado');
		}

		return relatorioPiaResposta;
	}
}
