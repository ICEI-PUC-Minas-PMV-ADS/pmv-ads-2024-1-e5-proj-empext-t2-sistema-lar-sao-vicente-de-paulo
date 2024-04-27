import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ResponsavelIdoso } from '../entities/responsavel-idoso.entity';

@Injectable()
export class FindAllResponsavelIdosoService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query: Prisma.ResponsavelIdosoFindManyArgs,
	): Promise<{ count: number; responsavelIdoso: ResponsavelIdoso[] }> {
		const [responsavelIdoso, count] = await this.prisma.$transaction([
			this.prisma.responsavelIdoso.findMany(query),
			this.prisma.responsavelIdoso.count({ where: query.where }),
		]);

		return { count, responsavelIdoso };
	}
}
