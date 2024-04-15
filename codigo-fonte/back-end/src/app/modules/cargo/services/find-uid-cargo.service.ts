import { Injectable } from '@nestjs/common';
import { Cargo } from '../entities/cargo.entity';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindUidCargoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string): Promise<Cargo | null> {
		const modeloPermissao = await this.prisma.cargo.findFirst({
			where: {
				uid,
			},
			include: {
				cargo_permissao: {
					select: { uid: true, ativo: true, id_permissao: true },
				},
				_count: { select: { usuario: true } },
			},
		});

		return modeloPermissao;
	}
}
