import { Injectable } from '@nestjs/common';
import { CreateModeloRelatorioPiaRespostaDto } from '../dtos/create-modelo-relatorio-pia-resposta.dto';
import { PrismaModeloRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-resposta.repository';
import { ModeloRelatorioPiaResposta } from '../entities/modelo-relatorio-pia-resposta.entity';
import { prisma } from '@/core/providers/database/prisma.service';
import { AppError } from '@utils/app-error';

@Injectable()
export class CreateModeloRelatorioPiaRespostaService {
	constructor(
		private modeloRelatorioPiaRespostaRepository: PrismaModeloRelatorioPiaRespostaRepository,
	) {}
	async execute(
		data: CreateModeloRelatorioPiaRespostaDto,
	): Promise<ModeloRelatorioPiaResposta> {
		const perguntaExists =
			await prisma.modeloRelatorioPiaPergunta.findUnique({
				where: { id: data.id_modelo_relatorio_pia_pergunta },
			});

		if (!perguntaExists) {
			throw new AppError('id_modelo_relatorio_pia_pergunta não existe');
		}

		const modeloRelatorioPiaResposta =
			await this.modeloRelatorioPiaRespostaRepository.create(data);

		return modeloRelatorioPiaResposta;
	}
}
