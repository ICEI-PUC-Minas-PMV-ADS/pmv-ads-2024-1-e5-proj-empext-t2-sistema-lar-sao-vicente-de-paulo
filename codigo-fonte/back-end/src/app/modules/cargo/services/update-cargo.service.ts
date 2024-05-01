import { Injectable } from '@nestjs/common';
import { UpdateCargoDto } from '../dtos/update-cargo-dto';
import { PrismaService } from '@/core/providers/database/prisma.service';
import { PrismaCargoRepository } from '../repositories/prisma/prisma-cargo-repository';

@Injectable()
export class UpdateCargoService {
	constructor(
		private prisma: PrismaService,
		private cargoRepository: PrismaCargoRepository
	) {}

	async execute(uid: string, data: UpdateCargoDto): Promise<void> {
		await this.cargoRepository.update(uid, data);

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
