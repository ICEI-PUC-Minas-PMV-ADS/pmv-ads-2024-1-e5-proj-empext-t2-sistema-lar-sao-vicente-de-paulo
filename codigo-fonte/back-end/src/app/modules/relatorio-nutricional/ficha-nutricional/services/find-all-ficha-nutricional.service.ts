import { Injectable } from '@nestjs/common';
import { FichaNutricional, Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllFichaNutricionalService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query: Prisma.FichaNutricionalFindManyArgs,
	): Promise<{ count: number; fichasNutricionais: FichaNutricional[] }> {
		query = {
			...query,
			include: {
				idoso: true,
			},
		};

		const [fichasNutricionais, count] = await this.prisma.$transaction([
			this.prisma.fichaNutricional.findMany(query),
			this.prisma.fichaNutricional.count({
				where: query.where,
			}),
		]);

		return {
			count,
			fichasNutricionais,
		};
	}
}
