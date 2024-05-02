import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-relatorio-pia-opcao.repository';

@Injectable()
export class DeleteRelatorioPiaOpcaoService {
	constructor(
		private relatorioPiaOpcaoRepository: PrismaRelatorioPiaOpcaoRepository,
	) {}

	async execute(uid: string): Promise<void> {
		const relatorioPiaOpcao =
			await this.relatorioPiaOpcaoRepository.findByUid(uid);

		if (!relatorioPiaOpcao) {
			throw new AppError('Relatório PIA Opção não encontrado');
		}

		await this.relatorioPiaOpcaoRepository.delete(uid);
	}
}
