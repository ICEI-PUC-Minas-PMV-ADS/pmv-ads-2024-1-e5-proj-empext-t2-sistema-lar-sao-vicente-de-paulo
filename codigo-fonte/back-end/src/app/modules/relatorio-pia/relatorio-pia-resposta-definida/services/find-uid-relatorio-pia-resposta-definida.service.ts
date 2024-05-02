import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaDefinidaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta-definida.repository';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';

@Injectable()
export class FindUidRelatorioPiaRespostaDefinidaService {
	constructor(
		private relatorioPiaRespostaDefinidaRepository: PrismaRelatorioPiaRespostaDefinidaRepository,
	) {}

	async execute(uid: string): Promise<RelatorioPiaRespostaDefinida | null> {
		const relatorioPiaRespostaDefinida =
			await this.relatorioPiaRespostaDefinidaRepository.findByUid(uid);

		if (!relatorioPiaRespostaDefinida) {
			throw new AppError(
				'Relatório PIA Resposta Definida não encontrada',
			);
		}

		return relatorioPiaRespostaDefinida;
	}
}
