import { Injectable } from '@nestjs/common';
import { Prisma, QuadroClinico } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllQuadroClinicoService {
	constructor(private prisma: PrismaService) {}

	async execute(query: Prisma.QuadroClinicoFindManyArgs): Promise<{
		count: number;
		quadrosClinicos: QuadroClinico[];
	}> {
		query = {
			...query,
			include: {
				ficha_nutricional: true,
			},
		};

		const [quadrosClinicos, count] = await this.prisma.$transaction([
			this.prisma.quadroClinico.findMany(query),
			this.prisma.quadroClinico.count({
				where: query.where,
			}),
		]);

		return {
			count,
			quadrosClinicos,
		};
	}
}
