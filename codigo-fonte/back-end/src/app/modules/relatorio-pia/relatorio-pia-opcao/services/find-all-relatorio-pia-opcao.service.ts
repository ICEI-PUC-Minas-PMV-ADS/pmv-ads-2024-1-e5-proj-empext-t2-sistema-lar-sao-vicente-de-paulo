import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { RelatorioPiaRespostaOpcao } from '../entities/relatorio-pia-opcao.entity';

@Injectable()
export class FindAllRelatorioPiaOpcaoService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.RelatorioPiaRespostaOpcaoFindManyArgs,
	): Promise<{
		count: number;
		relatoriosPiasOpcaos: RelatorioPiaRespostaOpcao[];
	}> {
		query = {
			...query,
		};

		const [relatoriosPiasOpcaos, count] = await this.prisma.$transaction([
			this.prisma.relatorioPiaRespostaOpcao.findMany(query),
			this.prisma.relatorioPiaRespostaOpcao.count({
				where: query.where,
			}),
		]);

		return {
			count,
			relatoriosPiasOpcaos,
		};
	}
}
