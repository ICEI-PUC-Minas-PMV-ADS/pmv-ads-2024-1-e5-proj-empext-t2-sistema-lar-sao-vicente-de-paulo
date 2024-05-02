import { Injectable } from '@nestjs/common';
import { prisma } from '@/core/providers/database/prisma.service';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-relatorio-pia-opcao.repository';
import { CreateRelatorioPiaOpcaoDto } from '../dtos/create-relatorio-pia-opcao.dto';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';

@Injectable()
export class CreateRelatorioPiaOpcaoService {
	constructor(
		private relatorioPiaOpcaoRepository: PrismaRelatorioPiaOpcaoRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaOpcaoDto,
	): Promise<RelatorioPiaRespostaOpcao> {
		const RelatorioPiaRespostaExists =
			await prisma.relatorioPiaResposta.findUnique({
				where: { id: data.id_relatorio_pia_resposta },
			});

		if (!RelatorioPiaRespostaExists) {
			throw new AppError('id_relatorio_pia_resposta não existe');
		}

		const alreadyExists = await prisma.relatorioPiaRespostaOpcao.findFirst({
			where: {
				opcao: data.opcao,
			},
		});

		if (alreadyExists) {
			throw new AppError('Relatório PIA Opção já existente');
		}

		const RelatorioPiaOpcao =
			await this.relatorioPiaOpcaoRepository.create(data);

		return RelatorioPiaOpcao;
	}
}
