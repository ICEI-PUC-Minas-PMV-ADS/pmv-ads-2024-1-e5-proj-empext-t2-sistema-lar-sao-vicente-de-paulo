import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaPerguntaRepository } from '../repositories/prisma/prisma-relatorio-pia-pergunta.repository';
import { CreateRelatorioPiaPerguntaDto } from '../dtos/create-relatorio-pia-pergunta.dto';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';
import { PrismaRelatorioPiaRepository } from '../../relatorio-pia/repositories/prisma/prisma-relatorio-pia.repository';

@Injectable()
export class CreateRelatorioPiaPerguntaService {
	constructor(
		private relatorioPiaPerguntaRepository: PrismaRelatorioPiaPerguntaRepository,
		private relatorioPiaRepository: PrismaRelatorioPiaRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaPerguntaDto,
	): Promise<RelatorioPiaPergunta> {
		const relatorioPiaExists = await this.relatorioPiaRepository.findById(
			data.id_relatorio_pia,
		);

		if (!relatorioPiaExists) {
			throw new AppError('Relatório PIA com o ID fornecido não existe');
		}

		const relatorioPia =
			await this.relatorioPiaPerguntaRepository.create(data);

		return relatorioPia;
	}
}
