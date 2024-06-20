import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta.repository';
import { CreateRelatorioPiaRespostaDto } from '../dtos/create-relatorio-pia-resposta.dto';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';
import { PrismaRelatorioPiaPerguntaRepository } from '../../relatorio-pia-pergunta/repositories/prisma/prisma-relatorio-pia-pergunta.repository';

@Injectable()
export class CreateRelatorioPiaRespostaService {
	constructor(
		private relatorioPiaRespostaRepository: PrismaRelatorioPiaRespostaRepository,
		private relatorioPiaPerguntaRepository: PrismaRelatorioPiaPerguntaRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaRespostaDto,
	): Promise<RelatorioPiaResposta> {
		const relatorioPiaPerguntaExists =
			await this.relatorioPiaPerguntaRepository.findById(
				data.id_relatorio_pia_pergunta,
			);

		if (!relatorioPiaPerguntaExists) {
			throw new AppError(
				'Relatório PIA Pergunta com o ID fornecido não existe',
			);
		}

		const relatorioPiaResposta =
			await this.relatorioPiaRespostaRepository.create(data);

		return relatorioPiaResposta;
	}
}
