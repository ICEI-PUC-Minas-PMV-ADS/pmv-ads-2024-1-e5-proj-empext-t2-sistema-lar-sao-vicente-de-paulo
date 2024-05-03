import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { UpdateRelatorioPiaPerguntaDto } from '../dtos/update-relatorio-pia-pergunta.dto';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';
import { PrismaRelatorioPiaPerguntaRepository } from '../repositories/prisma/prisma-relatorio-pia-pergunta.repository';

@Injectable()
export class UpdateRelatorioPiaPerguntaService {
	constructor(
		private relatorioPiaPerguntaRepository: PrismaRelatorioPiaPerguntaRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateRelatorioPiaPerguntaDto,
	): Promise<RelatorioPiaPergunta> {
		const alreadyExists =
			await this.relatorioPiaPerguntaRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Relatório PIA Pergunta não encontrado');
		}

		const relatorioPiaPergunta =
			await this.relatorioPiaPerguntaRepository.update(
				data,
				alreadyExists,
			);

		return relatorioPiaPergunta;
	}
}
