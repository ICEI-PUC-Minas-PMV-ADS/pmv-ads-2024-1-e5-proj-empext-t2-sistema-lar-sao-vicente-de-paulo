import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { ModeloRelatorioPia } from '../entities/modelo-relatorio-pia.entity';

@Injectable()
export class FindAllModeloRelatorioPiaService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.ModeloRelatorioPiaFindManyArgs,
	): Promise<{ count: number; modelosRelatoriosPias: ModeloRelatorioPia[] }> {
		const [modelosRelatoriosPias, count] = await this.prisma.$transaction([
			this.prisma.modeloRelatorioPia.findMany(query),
			this.prisma.modeloRelatorioPia.count({
				where: query.where,
			}),
		]);

		return {
			count,
			modelosRelatoriosPias,
		};
	}
}
