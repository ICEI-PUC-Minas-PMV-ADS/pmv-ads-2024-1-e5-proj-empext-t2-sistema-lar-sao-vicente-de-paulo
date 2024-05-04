import { prisma } from '@/core/providers/database/prisma.service';
import { cargoRepository } from '../cargo-repository';
import { UpdateCargoDto } from '../../dtos/update-cargo-dto';
import { CreateCargoDto } from '../../dtos/create-cargo-dto';
import { Cargo } from '@prisma/client';

export class PrismaCargoRepository implements cargoRepository {
	async findByUid(uid: string): Promise<Cargo | null> {
		const cargo = await prisma.cargo.findFirst({
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

		return cargo;
	}

	async delete(uid: string) {
		await prisma.cargoPermissao.deleteMany({
			where: {
				cargo: { uid },
			},
		});

		await prisma.cargo.delete({
			where: {
				uid,
			},
		});

		return;
	}

	async update(uid: string, data: UpdateCargoDto): Promise<void> {
		await prisma.cargo.update({
			where: {
				uid,
			},
			data: { nome: data.nome, situacao: data.situacao },
		});

		return;
	}

	async create(data: CreateCargoDto): Promise<Cargo | null> {
		const cargo = await prisma.cargo.create({
			data: { nome: data.nome },
		});

		return cargo;
	}
}
