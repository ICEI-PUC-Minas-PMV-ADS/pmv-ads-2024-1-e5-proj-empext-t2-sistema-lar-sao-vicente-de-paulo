import { Injectable } from '@nestjs/common';
import { AntropometriaNutricional, Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllAntropometriaService {
	constructor(private prisma: PrismaService) {}

	async execute(query: Prisma.AntropometriaNutricionalFindManyArgs): Promise<{
		count: number;
		antropometrias: AntropometriaNutricional[];
	}> {
		query = {
			...query,
			include: {
				ficha_nutricional: true,
			},
		};

		const [antropometrias, count] = await this.prisma.$transaction([
			this.prisma.antropometriaNutricional.findMany(query),
			this.prisma.antropometriaNutricional.count({
				where: query.where,
			}),
		]);

		return {
			count,
			antropometrias,
		};
	}
}
