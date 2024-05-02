import { Injectable } from '@nestjs/common';
import { prisma } from '@/core/providers/database/prisma.service';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta.repository';
import { CreateRelatorioPiaRespostaDto } from '../dtos/create-relatorio-pia-resposta.dto';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';

@Injectable()
export class CreateRelatorioPiaRespostaService {
	constructor(
		private relatorioPiaRespostaRepository: PrismaRelatorioPiaRespostaRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaRespostaDto,
	): Promise<RelatorioPiaResposta> {
		const RelatorioPiaExists = await prisma.relatorioPiaPergunta.findUnique(
			{
				where: { id: data.id_relatorio_pia_pergunta },
			},
		);

		if (!RelatorioPiaExists) {
			throw new AppError('id_relatorio_pia_pergunta não existe');
		}

		const alreadyExists = await prisma.relatorioPiaResposta.findFirst({
			where: {
				titulo: data.titulo,
			},
		});

		if (alreadyExists) {
			throw new AppError('Relatório PIA Resposta já existente');
		}

		const RelatorioPiaResposta =
			await this.relatorioPiaRespostaRepository.create(data);

		return RelatorioPiaResposta;
	}
}
