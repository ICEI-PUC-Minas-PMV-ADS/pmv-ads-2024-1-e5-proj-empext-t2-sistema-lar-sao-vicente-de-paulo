import { Injectable } from '@nestjs/common';
import { UpdateCargoDto } from '../dtos/update-cargo-dto';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class UpdateCargoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string, data: UpdateCargoDto): Promise<void> {
		const cargo = await this.prisma.cargo.update({
			where: {
				uid,
			},
			data: data,
		});

		if (data.permissoes)
			await this.prisma.$transaction(
				data.permissoes.map((permissao) =>
					this.prisma.cargoPermissao.update({
						where: { uid: permissao.uid },
						data: { ativo: permissao.ativo },
					}),
				),
			);

		if (data.situacao === 'INATIVO') {
			await this.prisma.usuario.updateMany({
				where: { id_cargo: cargo.id },
				data: { id_cargo: null },
			});
		}

		return;
	}
}
