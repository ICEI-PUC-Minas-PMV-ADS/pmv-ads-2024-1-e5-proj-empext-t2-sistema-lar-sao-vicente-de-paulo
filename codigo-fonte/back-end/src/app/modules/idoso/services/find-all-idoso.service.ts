import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Idoso } from '../entities/idoso.entity';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllIdososService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query: Prisma.IdosoFindManyArgs,
	): Promise<{ count: number; idosos: Idoso[] }> {
		query = {
			...query,
			include: {
				responsavel_idoso: true,
				_count: { select: { responsavel_idoso: true } },
			},
		};

		const [idosos, count] = await this.prisma.$transaction([
			this.prisma.idoso.findMany(query),
			this.prisma.idoso.count({
				where: query.where,
			}),
		]);

		return {
			count,
			idosos,
		};
	}
}
