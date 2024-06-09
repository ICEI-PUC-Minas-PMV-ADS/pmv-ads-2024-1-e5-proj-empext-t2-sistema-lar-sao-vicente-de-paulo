import { Injectable } from '@nestjs/common';
import { NecessidadeNutricional, Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllNecessidadeNutricionalService {
	constructor(private prisma: PrismaService) {}

	async execute(query: Prisma.NecessidadeNutricionalFindManyArgs): Promise<{
		count: number;
		necessidadesNutricionais: NecessidadeNutricional[];
	}> {
		query = {
			...query,
			include: {
				ficha_nutricional: true,
			},
		};

		const [necessidadesNutricionais, count] =
			await this.prisma.$transaction([
				this.prisma.necessidadeNutricional.findMany(query),
				this.prisma.necessidadeNutricional.count({
					where: query.where,
				}),
			]);

		return {
			count,
			necessidadesNutricionais,
		};
	}
}
