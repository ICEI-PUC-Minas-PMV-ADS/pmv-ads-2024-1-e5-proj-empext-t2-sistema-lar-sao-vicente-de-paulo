import { Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllUsuarioService {
	constructor(private prisma: PrismaService) {}

	async execute(
		query?: Prisma.UsuarioFindManyArgs,
	): Promise<{ count: number; usuarios: Usuario[] }> {
		const [usuarios, count] = await this.prisma.$transaction([
			this.prisma.usuario.findMany(query),
			this.prisma.usuario.count({
				where: query.where,
			}),
		]);

		return {
			count,
			usuarios,
		};
	}
}
