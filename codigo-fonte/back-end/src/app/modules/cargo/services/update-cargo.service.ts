import { Injectable } from '@nestjs/common';
import { UpdateCargoDto } from '../dtos/update-cargo-dto';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class UpdateCargoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string, data: UpdateCargoDto): Promise<void> {
		await this.prisma.cargo.update({
			where: {
				uid,
			},
			data: { nome: data.nome },
		});

		await this.prisma.$transaction(
			data.permissoes.map((permissao) =>
				this.prisma.cargoPermissao.update({
					where: { uid: permissao.uid },
					data: { ativo: permissao.ativo },
				}),
			),
		);

		return;
	}
}
