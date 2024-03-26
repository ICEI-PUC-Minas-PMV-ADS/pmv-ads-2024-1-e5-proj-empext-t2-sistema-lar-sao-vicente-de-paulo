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
