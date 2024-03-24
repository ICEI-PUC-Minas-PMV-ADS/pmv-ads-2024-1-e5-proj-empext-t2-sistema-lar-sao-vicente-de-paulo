import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Permissao } from '../entities/permissao.entity';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query: Prisma.PermissaoFindManyArgs,
	): Promise<{ count: number; permissoes: Permissao[] }> {
		const [permissoes, count] = await this.prisma.$transaction([
			this.prisma.permissao.findMany(query),
			this.prisma.permissao.count({ where: query.where }),
		]);

		return { count, permissoes };
	}
}
