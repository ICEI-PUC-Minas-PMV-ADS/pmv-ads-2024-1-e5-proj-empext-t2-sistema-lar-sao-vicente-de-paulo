import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GrupoPermissao } from '../entities/grupo-permissao.entity';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllGrupoPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query: Prisma.GrupoPermissaoFindManyArgs,
	): Promise<{ count: number; grupoPermissoes: GrupoPermissao[] }> {
		const [grupoPermissoes, count] = await this.prisma.$transaction([
			this.prisma.grupoPermissao.findMany(query),
			this.prisma.grupoPermissao.count({ where: query.where }),
		]);

		return { count, grupoPermissoes };
	}
}
