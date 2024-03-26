import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CargoPermissao } from '../entities/modelo-cargo-permissao.entity';

@Injectable()
export class FindAllCargoPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query: Prisma.CargoPermissaoFindManyArgs,
	): Promise<{ count: number; cargoPermissoes: CargoPermissao[] }> {
		const [cargoPermissoes, count] = await this.prisma.$transaction([
			this.prisma.cargoPermissao.findMany(query),
			this.prisma.cargoPermissao.count({ where: query.where }),
		]);

		return { count, cargoPermissoes };
	}
}
