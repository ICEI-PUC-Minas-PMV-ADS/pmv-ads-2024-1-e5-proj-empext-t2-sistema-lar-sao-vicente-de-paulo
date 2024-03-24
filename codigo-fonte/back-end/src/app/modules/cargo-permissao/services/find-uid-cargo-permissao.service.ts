import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CargoPermissao } from '../entities/modelo-cargo-permissao.entity';

@Injectable()
export class FindUidCargoPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string): Promise<CargoPermissao | null> {
		const cargoPermissoes = await this.prisma.cargoPermissao.findFirst({
			where: {
				uid,
			},
		});

		return cargoPermissoes;
	}
}
