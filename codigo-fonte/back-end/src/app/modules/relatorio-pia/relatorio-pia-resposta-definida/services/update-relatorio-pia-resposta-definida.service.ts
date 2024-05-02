import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { UpdateRelatorioPiaRespostaDefinidaDto } from '../dtos/update-relatorio-pia-resposta-definida.dto';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';
import { PrismaRelatorioPiaRespostaDefinidaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta-definida.repository';

@Injectable()
export class UpdateRelatorioPiaRespostaDefinidaService {
	constructor(
		private relatorioPiaRespostaDefinidaRepository: PrismaRelatorioPiaRespostaDefinidaRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateRelatorioPiaRespostaDefinidaDto,
	): Promise<RelatorioPiaRespostaDefinida> {
		const alreadyExists =
			await this.relatorioPiaRespostaDefinidaRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError(
				'Relatório PIA Resposta Definida não encontrada',
			);
		}

		const RelatorioPiaRespostaDefinida =
			await this.relatorioPiaRespostaDefinidaRepository.update(
				data,
				alreadyExists,
			);

		return RelatorioPiaRespostaDefinida;
	}
}
