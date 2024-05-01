import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { ModeloRelatorioPiaRespostaOpcao } from '../entities/modelo-relatorio-pia-opcao';
import { PrismaModeloRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-opcao.repository';

@Injectable()
export class FindUidModeloRelatorioPiaOpcaoService {
	constructor(private modeloRelatorioPiaOpcaoRepository: PrismaModeloRelatorioPiaOpcaoRepository,) {}

	async execute(uid: string): Promise<ModeloRelatorioPiaRespostaOpcao | null> {
		const modeloRelatorioPiaOpcao = await this.modeloRelatorioPiaOpcaoRepository.findByUid(uid);

		if (!modeloRelatorioPiaOpcao) {
			throw new AppError("Modelo de opção de resposta não encontrado");
		}

		return modeloRelatorioPiaOpcao;
	}
}
