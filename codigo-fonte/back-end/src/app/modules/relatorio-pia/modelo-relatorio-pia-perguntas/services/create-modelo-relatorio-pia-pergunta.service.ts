import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/app-error';
import { PrismaModeloRelatorioPiaPerguntaRepository } from '../repositories/prisma/prisma-modelo-relatorio-pia-pergunta.repository';
import { ModeloRelatorioPiaPergunta } from '../entities/modelo-relatorio-pia-pergunta.entity';
import { CreateModeloRelatorioPiaPerguntaDto } from '../dtos/create-modelo-relatorio-pia-pergunta.dto';
import { prisma } from '@/core/providers/database/prisma.service';

@Injectable()
export class CreateModeloRelatorioPiaPerguntaService {
	constructor(
		private modeloRelatorioPiaPerguntaRepository: PrismaModeloRelatorioPiaPerguntaRepository,
	) {}
	async execute(
		data: CreateModeloRelatorioPiaPerguntaDto,
	): Promise<ModeloRelatorioPiaPergunta> {
		const modeloRelatorioExists =
			await prisma.modeloRelatorioPia.findUnique({
				where: { id: data.id_modelo_relatorio_pia },
			});

		if (!modeloRelatorioExists) {
			throw new AppError('id_modelo_relatorio_pia não existe');
		}

		const modeloRelatorioPia =
			await this.modeloRelatorioPiaPerguntaRepository.create(data);

		return modeloRelatorioPia;
	}
}
