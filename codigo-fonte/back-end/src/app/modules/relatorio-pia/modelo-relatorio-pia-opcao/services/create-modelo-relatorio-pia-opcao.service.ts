import { Injectable } from '@nestjs/common';
import { CreateModeloRelatorioPiaOpcaoDto } from '../dtos/create-modelo-relatorio-pia-opcao.dto';
import { PrismaModeloRelatorioPiaOpcaoRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-opcao.repository';
import { ModeloRelatorioPiaRespostaOpcao } from '../entities/modelo-relatorio-pia-opcao';
import { prisma } from '@/core/providers/database/prisma.service';
import { AppError } from '@utils/app-error';

@Injectable()
export class CreateModeloRelatorioPiaOpcaoService {
	constructor(
		private modeloRelatorioPiaOpcaoRepository: PrismaModeloRelatorioPiaOpcaoRepository,
	) {}
	async execute(
		data: CreateModeloRelatorioPiaOpcaoDto,
	): Promise<ModeloRelatorioPiaRespostaOpcao> {
		const modeloRespostaExists =
			await prisma.modeloRelatorioPiaResposta.findUnique({
				where: { id: data.id_modelo_relatorio_pia_resposta },
			});

		if (!modeloRespostaExists) {
			throw new AppError('id_modelo_relatorio_pia_resposta não existe');
		}

		const modeloRelatorioPiaOpcao =
			await this.modeloRelatorioPiaOpcaoRepository.create(data);

		return modeloRelatorioPiaOpcao;
	}
}
