import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { ModeloRelatorioPiaResposta } from '../entities/modelo-relatorio-pia-resposta.entity';

@Injectable()
export class FindAllModeloRelatorioPiaRespostaService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.ModeloRelatorioPiaRespostaFindManyArgs,
	): Promise<{
		count: number;
		modelosRelatoriosPiasRespostas: ModeloRelatorioPiaResposta[];
	}> {
		query = {
			...query,
		};

		const [modelosRelatoriosPiasRespostas, count] =
			await this.prisma.$transaction([
				this.prisma.modeloRelatorioPiaResposta.findMany(query),
				this.prisma.modeloRelatorioPiaResposta.count({
					where: query.where,
				}),
			]);

		return {
			count,
			modelosRelatoriosPiasRespostas,
		};
	}
}
