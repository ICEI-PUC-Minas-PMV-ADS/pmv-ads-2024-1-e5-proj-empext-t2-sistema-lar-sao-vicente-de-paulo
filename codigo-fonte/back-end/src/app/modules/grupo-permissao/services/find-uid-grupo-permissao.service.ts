import { Injectable } from '@nestjs/common';
import { GrupoPermissao } from '../entities/grupo-permissao.entity';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindUidGrupoPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string): Promise<GrupoPermissao | null> {
		const grupoPermissao = await this.prisma.grupoPermissao.findFirst({
			where: {
				uid,
			},
		});

		return grupoPermissao;
	}
}
