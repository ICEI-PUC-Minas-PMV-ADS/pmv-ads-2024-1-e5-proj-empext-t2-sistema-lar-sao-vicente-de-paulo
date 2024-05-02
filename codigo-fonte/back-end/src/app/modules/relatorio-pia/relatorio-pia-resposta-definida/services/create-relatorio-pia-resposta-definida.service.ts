import { Injectable } from '@nestjs/common';
import { prisma } from '@/core/providers/database/prisma.service';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaDefinidaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta-definida.repository';
import { CreateRelatorioPiaRespostaDefinidaDto } from '../dtos/create-relatorio-pia-resposta-definida.dto';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';

@Injectable()
export class CreateRelatorioPiaRespostaDefinidaService {
	constructor(
		private relatorioPiaRespostaDefinidaRepository: PrismaRelatorioPiaRespostaDefinidaRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaRespostaDefinidaDto,
	): Promise<RelatorioPiaRespostaDefinida> {
		const RelatorioPiaRespostaExists =
			await prisma.relatorioPiaRespostaOpcao.findUnique({
				where: { uid: data.uid_relatorio_pia_resposta_opcao },
			});

		if (!RelatorioPiaRespostaExists) {
			throw new AppError('uid_relatorio_pia_resposta_opcao não existe');
		}

		const alreadyExists =
			await prisma.relatorioPiaRespostaDefinida.findFirst({
				where: {
					valor: data.valor,
				},
			});

		if (alreadyExists) {
			throw new AppError('Relatório PIA Resposta Definida já existente');
		}

		const RelatorioPiaRespostaDefinida =
			await this.relatorioPiaRespostaDefinidaRepository.create(data);

		return RelatorioPiaRespostaDefinida;
	}
}
