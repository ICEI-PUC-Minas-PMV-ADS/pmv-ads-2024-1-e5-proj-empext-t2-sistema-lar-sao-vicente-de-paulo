import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { UpdateRelatorioPiaRespostaDto } from '../dtos/update-relatorio-pia-resposta.dto';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';
import { PrismaRelatorioPiaRespostaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta.repository';

@Injectable()
export class UpdateRelatorioPiaRespostaService {
	constructor(
		private relatorioPiaRespostaRepository: PrismaRelatorioPiaRespostaRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateRelatorioPiaRespostaDto,
	): Promise<RelatorioPiaResposta> {
		const alreadyExists =
			await this.relatorioPiaRespostaRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Relatório PIA Resposta não encontrado');
		}

		const relatorioPiaResposta =
			await this.relatorioPiaRespostaRepository.update(
				data,
				alreadyExists,
			);

		return relatorioPiaResposta;
	}
}
