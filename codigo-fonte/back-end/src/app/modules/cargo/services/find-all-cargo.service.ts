import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Cargo } from '../entities/cargo.entity';

@Injectable()
export class FindAllCargoService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query: Prisma.CargoFindManyArgs,
	): Promise<{ count: number; cargos: Cargo[] }> {
		const [cargos, count] = await this.prisma.$transaction([
			this.prisma.cargo.findMany(query),
			this.prisma.cargo.count({ where: query.where }),
		]);

		return { count, cargos };
	}
}
