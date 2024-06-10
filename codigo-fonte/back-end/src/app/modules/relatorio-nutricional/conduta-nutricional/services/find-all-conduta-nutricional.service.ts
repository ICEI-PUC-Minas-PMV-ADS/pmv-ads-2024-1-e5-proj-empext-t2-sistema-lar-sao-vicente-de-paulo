import { Injectable } from '@nestjs/common';
import { Prisma, CondutaNutricional } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllCondutaNutricionalService {
	constructor(private prisma: PrismaService) {}

	async execute(query: Prisma.CondutaNutricionalFindManyArgs): Promise<{
		count: number;
		condutasNutricionais: CondutaNutricional[];
	}> {
		query = {
			...query,
			include: {
				ficha_nutricional: true,
			},
		};

		const [condutasNutricionais, count] = await this.prisma.$transaction([
			this.prisma.condutaNutricional.findMany(query),
			this.prisma.condutaNutricional.count({
				where: query.where,
			}),
		]);

		return {
			count,
			condutasNutricionais,
		};
	}
}
