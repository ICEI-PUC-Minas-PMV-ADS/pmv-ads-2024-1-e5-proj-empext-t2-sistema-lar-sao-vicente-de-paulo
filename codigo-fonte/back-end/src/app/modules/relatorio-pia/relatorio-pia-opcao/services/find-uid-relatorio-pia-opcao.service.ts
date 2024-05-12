import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-relatorio-pia-opcao.repository';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';

@Injectable()
export class FindUidRelatorioPiaOpcaoService {
	constructor(
		private relatorioPiaOpcaoRepository: PrismaRelatorioPiaOpcaoRepository,
	) {}

	async execute(uid: string): Promise<RelatorioPiaRespostaOpcao | null> {
		const relatorioPiaOpcao =
			await this.relatorioPiaOpcaoRepository.findByUid(uid);

		if (!relatorioPiaOpcao) {
			throw new AppError('Relatório PIA Opção não encontrado');
		}

		return relatorioPiaOpcao;
	}
}
