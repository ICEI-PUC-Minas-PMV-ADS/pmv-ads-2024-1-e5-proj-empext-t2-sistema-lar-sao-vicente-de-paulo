import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaRelatorioPiaRespostaDefinidaRepository } from '../repositories/prisma/prisma-relatorio-pia-resposta-definida.repository';
import { CreateRelatorioPiaRespostaDefinidaDto } from '../dtos/create-relatorio-pia-resposta-definida.dto';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';
import { PrismaRelatorioPiaOpcaoRepository } from '../../relatorio-pia-opcao/repositories/prisma/prisma-relatorio-pia-opcao.repository';

@Injectable()
export class CreateRelatorioPiaRespostaDefinidaService {
	constructor(
		private relatorioPiaRespostaDefinidaRepository: PrismaRelatorioPiaRespostaDefinidaRepository,
		private relatorioPiaOpcaoRepository: PrismaRelatorioPiaOpcaoRepository,
	) {}

	async execute(
		data: CreateRelatorioPiaRespostaDefinidaDto,
	): Promise<RelatorioPiaRespostaDefinida> {
		const relatorioPiaRespostaOpcaoExists =
			await this.relatorioPiaOpcaoRepository.findByUid(
				data.uid_relatorio_pia_resposta_opcao,
			);

		if (!relatorioPiaRespostaOpcaoExists) {
			throw new AppError('Relatório PIA Resposta Opção UID não existe');
		}

		const alreadyExists =
			await this.relatorioPiaRespostaDefinidaRepository.findByValor(
				data.valor,
			);

		if (alreadyExists) {
			throw new AppError('Relatório PIA Resposta Definida já existente');
		}

		const relatorioPiaRespostaDefinida =
			await this.relatorioPiaRespostaDefinidaRepository.create(data);

		return relatorioPiaRespostaDefinida;
	}
}
