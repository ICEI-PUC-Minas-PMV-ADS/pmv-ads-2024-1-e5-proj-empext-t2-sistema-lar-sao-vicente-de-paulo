import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { ModeloRelatorioPiaResposta } from '../entities/modelo-relatorio-pia-resposta.entity';
import { PrismaModeloRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-resposta.repository';

@Injectable()
export class FindUidModeloRelatorioPiaRespostaService {
	constructor(private modeloRelatorioPiaRespostaRepository: PrismaModeloRelatorioPiaRespostaRepository,) {}

	async execute(uid: string): Promise<ModeloRelatorioPiaResposta | null> {
		const modeloRelatorioPiaResposta = await this.modeloRelatorioPiaRespostaRepository.findByUid(uid);

		if (!modeloRelatorioPiaResposta) {
			throw new AppError("Modelo de pergunta do Relatório PIA não encontrado");
		}

		return modeloRelatorioPiaResposta;
	}
}
