import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { RelatorioPiaPergunta } from '../entities/relatorio-pia-pergunta.entity';

@Injectable()
export class FindAllRelatorioPiaPerguntaService {
	constructor(private prisma: PrismaService) {}

	async execute(query?: Prisma.RelatorioPiaPerguntaFindManyArgs): Promise<{
		count: number;
		RelatoriosPiasPerguntas: RelatorioPiaPergunta[];
	}> {
		query = {
			...query,
		};

		const [RelatoriosPiasPerguntas, count] = await this.prisma.$transaction(
			[
				this.prisma.relatorioPiaPergunta.findMany(query),
				this.prisma.relatorioPiaPergunta.count({
					where: query.where,
				}),
			],
		);

		return {
			count,
			RelatoriosPiasPerguntas,
		};
	}
}
