import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaDefinidaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta-definida.repository';

@Injectable()
export class DeleteRelatorioPiaRespostaDefinidaService {
	constructor(
		private relatorioPiaRespostaDefinidaRepository: PrismaRelatorioPiaRespostaDefinidaRepository,
	) {}

	async execute(uid: string): Promise<void> {
		const relatorioPiaRespostaDefinida =
			await this.relatorioPiaRespostaDefinidaRepository.findByUid(uid);

		if (!relatorioPiaRespostaDefinida) {
			throw new AppError(
				'Relatório PIA Resposta Definida não encontrada',
			);
		}

		await this.relatorioPiaRespostaDefinidaRepository.delete(uid);

		return;
	}
}
