import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { UpdateRelatorioPiaOpcaoDto } from '../dtos/update-relatorio-pia-opcao.dto';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';
import { PrismaRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-relatorio-pia-opcao.repository';

@Injectable()
export class UpdateRelatorioPiaOpcaoService {
	constructor(
		private relatorioPiaOpcaoRepository: PrismaRelatorioPiaOpcaoRepository,
	) {}

	async execute(
		uid: string,
		data: UpdateRelatorioPiaOpcaoDto,
	): Promise<RelatorioPiaRespostaOpcao> {
		const alreadyExists =
			await this.relatorioPiaOpcaoRepository.findByUid(uid);

		if (!alreadyExists) {
			throw new AppError('Relatório PIA Opção não encontrado');
		}

		const relatorioPiaOpcao = await this.relatorioPiaOpcaoRepository.update(
			data,
			alreadyExists,
		);

		return relatorioPiaOpcao;
	}
}
