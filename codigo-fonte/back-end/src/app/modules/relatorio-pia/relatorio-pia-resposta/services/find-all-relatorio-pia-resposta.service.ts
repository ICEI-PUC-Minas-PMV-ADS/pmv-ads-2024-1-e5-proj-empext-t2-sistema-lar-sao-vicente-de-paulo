import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { RelatorioPiaResposta } from '../entities/relatorio-pia-resposta.entity';

@Injectable()
export class FindAllRelatorioPiaRespostaService {
	constructor(private prisma: PrismaService) {}

	async execute(query?: Prisma.RelatorioPiaRespostaFindManyArgs): Promise<{
		count: number;
		relatoriosPiasRespostas: RelatorioPiaResposta[];
	}> {
		query = {
			...query,
		};

		const [relatoriosPiasRespostas, count] = await this.prisma.$transaction(
			[
				this.prisma.relatorioPiaResposta.findMany(query),
				this.prisma.relatorioPiaResposta.count({
					where: query.where,
				}),
			],
		);

		return {
			count,
			relatoriosPiasRespostas,
		};
	}
}
