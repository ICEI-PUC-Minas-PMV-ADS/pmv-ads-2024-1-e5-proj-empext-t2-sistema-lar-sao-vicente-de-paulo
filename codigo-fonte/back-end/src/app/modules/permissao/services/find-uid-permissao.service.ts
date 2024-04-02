import { Injectable } from '@nestjs/common';
import { Permissao } from '../entities/permissao.entity';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindUidPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string): Promise<Permissao | null> {
		const permissao = await this.prisma.permissao.findFirst({
			where: {
				uid,
			},
		});

		return permissao;
	}
}
