import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { ModeloRelatorioPiaPergunta } from '../entities/modelo-relatorio-pia-pergunta.entity';

@Injectable()
export class FindAllModeloRelatorioPiaPerguntaService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.ModeloRelatorioPiaPerguntaFindManyArgs,
	): Promise<{ count: number; modelosRelatoriosPiasPerguntas: ModeloRelatorioPiaPergunta[] }> {
		query = {
			...query,
		};

		const [modelosRelatoriosPiasPerguntas, count] = await this.prisma.$transaction([
			this.prisma.modeloRelatorioPiaPergunta.findMany(query),
			this.prisma.modeloRelatorioPiaPergunta.count({
				where: query.where,
			}),
		]);

		return {
			count,
			modelosRelatoriosPiasPerguntas,
		};
	}
}
