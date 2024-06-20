import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-relatorio-pia-opcao.repository';
import { CreateRelatorioPiaOpcaoDto } from '../dtos/create-relatorio-pia-opcao.dto';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';
import { PrismaRelatorioPiaRespostaRepository } from '../../relatorio-pia-resposta/repositories/prisma/prisma-relatorio-pia-resposta.repository';

@Injectable()
export class CreateRelatorioPiaOpcaoService {
	constructor(
		private relatorioPiaOpcaoRepository: PrismaRelatorioPiaOpcaoRepository,
		private relatorioPiaRespostaRepository: PrismaRelatorioPiaRespostaRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaOpcaoDto,
	): Promise<RelatorioPiaRespostaOpcao> {
		const relatorioPiaRespostaExists =
			await this.relatorioPiaRespostaRepository.findById(
				data.id_relatorio_pia_resposta,
			);

		if (!relatorioPiaRespostaExists) {
			throw new AppError(
				'Relatório PIA Resposta com o ID fornecido não existe',
			);
		}

		const relatorioPiaOpcao =
			await this.relatorioPiaOpcaoRepository.create(data);

		return relatorioPiaOpcao;
	}
}
