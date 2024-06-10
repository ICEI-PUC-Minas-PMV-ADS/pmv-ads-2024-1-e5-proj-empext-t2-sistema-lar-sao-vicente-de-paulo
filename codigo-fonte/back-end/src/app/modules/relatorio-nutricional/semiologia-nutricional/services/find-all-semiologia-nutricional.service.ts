import { Injectable } from '@nestjs/common';
import { Prisma, SemiologiaNutricional } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllSemiologiaNutricionalService {
	constructor(private prisma: PrismaService) {}

	async execute(query: Prisma.SemiologiaNutricionalFindManyArgs): Promise<{
		count: number;
		semiologiasNutricionais: SemiologiaNutricional[];
	}> {
		query = {
			...query,
			include: {
				ficha_nutricional: true,
			},
		};

		const [semiologiasNutricionais, count] = await this.prisma.$transaction(
			[
				this.prisma.semiologiaNutricional.findMany(query),
				this.prisma.semiologiaNutricional.count({
					where: query.where,
				}),
			],
		);

		return {
			count,
			semiologiasNutricionais,
		};
	}
}
