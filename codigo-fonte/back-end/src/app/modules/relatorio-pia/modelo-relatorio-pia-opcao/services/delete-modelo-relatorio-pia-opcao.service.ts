import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaModeloRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-opcao.repository';

@Injectable()
export class DeleteModeloRelatorioPiaOpcaoService {
	constructor(
		private modeloRelatorioPiaOpcaoRepository: PrismaModeloRelatorioPiaOpcaoRepository,
	) {}
	async execute(uid: string): Promise<void> {
		const modeloRelatorioPiaOpcao =
			await this.modeloRelatorioPiaOpcaoRepository.findByUid(uid);

		if (!modeloRelatorioPiaOpcao) {
			throw new AppError('Modelo de opção de resposta não encontrado');
		}

		await this.modeloRelatorioPiaOpcaoRepository.delete(uid);

		return;
	}
}
