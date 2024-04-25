import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaModeloRelatorioPiaPerguntaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-pergunta.repository';
import { ModeloRelatorioPiaPergunta } from '../entities/modelo-relatorio-pia-pergunta.entity';

@Injectable()
export class FindUidModeloRelatorioPiaPerguntaService {
	constructor(private modeloRelatorioPiaPerguntaRepository: PrismaModeloRelatorioPiaPerguntaRepository,) {}

	async execute(uid: string): Promise<ModeloRelatorioPiaPergunta | null> {
		const modeloRelatorioPiaPergunta = await this.modeloRelatorioPiaPerguntaRepository.findByUid(uid);

		if (!modeloRelatorioPiaPergunta) {
			throw new AppError("Modelo de pergunta do Relatório PIA não encontrado");
		}

		return modeloRelatorioPiaPergunta;
	}
}
