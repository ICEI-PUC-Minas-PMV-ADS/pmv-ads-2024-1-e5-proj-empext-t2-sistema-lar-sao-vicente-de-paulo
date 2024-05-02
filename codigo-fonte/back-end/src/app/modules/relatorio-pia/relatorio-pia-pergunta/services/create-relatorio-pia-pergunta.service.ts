import { Injectable } from '@nestjs/common';
import { prisma } from '@/core/providers/database/prisma.service';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaPerguntaRepository } from '../repositories/prisma/prisma-relatorio-pia-pergunta.repository';
import { CreateRelatorioPiaPerguntaDto } from '../dtos/create-relatorio-pia-pergunta.dto';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';

@Injectable()
export class CreateRelatorioPiaPerguntaService {
	constructor(
		private relatorioPiaPerguntaRepository: PrismaRelatorioPiaPerguntaRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaPerguntaDto,
	): Promise<RelatorioPiaPergunta> {
		const RelatorioPiaExists = await prisma.relatorioPia.findUnique({
			where: { id: data.id_relatorio_pia },
		});

		if (!RelatorioPiaExists) {
			throw new AppError('id_relatorio_pia não existe');
		}

		const alreadyExists = await prisma.relatorioPiaPergunta.findFirst({
			where: {
				pergunta: data.pergunta,
			},
		});

		if (alreadyExists) {
			throw new AppError('Relatório PIA pergunta já existente');
		}

		const RelatorioPia =
			await this.relatorioPiaPerguntaRepository.create(data);

		return RelatorioPia;
	}
}
