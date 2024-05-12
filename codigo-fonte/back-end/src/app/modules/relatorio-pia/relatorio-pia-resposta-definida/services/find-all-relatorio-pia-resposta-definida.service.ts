import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { RelatorioPiaRespostaDefinida } from '../entities/relatorio-pia-resposta-definida.entity';

@Injectable()
export class FindAllRelatorioPiaRespostaDefinidaService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.RelatorioPiaRespostaDefinidaFindManyArgs,
	): Promise<{
		count: number;
		relatoriosPiasRespostaDefinidas: RelatorioPiaRespostaDefinida[];
	}> {
		query = {
			...query,
		};

		const [relatoriosPiasRespostaDefinidas, count] =
			await this.prisma.$transaction([
				this.prisma.relatorioPiaRespostaDefinida.findMany(query),
				this.prisma.relatorioPiaRespostaDefinida.count({
					where: query.where,
				}),
			]);

		return {
			count,
			relatoriosPiasRespostaDefinidas,
		};
	}
}
