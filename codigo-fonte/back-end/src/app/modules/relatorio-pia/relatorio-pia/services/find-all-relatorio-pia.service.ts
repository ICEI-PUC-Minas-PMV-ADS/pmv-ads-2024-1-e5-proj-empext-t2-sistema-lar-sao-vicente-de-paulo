import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { RelatorioPia } from '../entities/relatorio-pia.entity';

@Injectable()
export class FindAllRelatorioPiaService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.RelatorioPiaFindManyArgs,
	): Promise<{ count: number; relatoriosPias: RelatorioPia[] }> {
		query = {
			...query,
		};

		const [relatoriosPias, count] = await this.prisma.$transaction([
			this.prisma.relatorioPia.findMany(query),
			this.prisma.relatorioPia.count({
				where: query.where,
			}),
		]);

		return {
			count,
			relatoriosPias,
		};
	}
}
