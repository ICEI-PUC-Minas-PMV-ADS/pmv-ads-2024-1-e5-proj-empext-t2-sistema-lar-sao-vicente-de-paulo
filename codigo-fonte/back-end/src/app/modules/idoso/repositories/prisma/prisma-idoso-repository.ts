import { Idoso, Prisma } from '@prisma/client';
import { idosoRepository } from '../idoso.repository';
import { DeleteIdosoDto } from '@/app/modules/idoso/dtos/delete-idoso.dto';
import { UpdateIdosoDto } from '@/app/modules/idoso/dtos/update-idoso.dto';
import { prisma } from '@/core/providers/database/prisma.service';

export class PrismaIdosoRepository implements idosoRepository {
	async create(data: Prisma.IdosoUncheckedCreateInput) {
		const idoso = await prisma.idoso.create({
			data,
		});

		return idoso;
	}
	async findByCpf(cpf: string) {
		const idoso = await prisma.idoso.findFirst({
			where: {
				cpf,
			},
		});

		return idoso;
	}
	async findByCnh(cnh: string) {
		const idoso = await prisma.idoso.findFirst({
			where: {
				cnh,
			},
		});

		return idoso;
	}
	async findByRg(rg: string) {
		const idoso = await prisma.idoso.findFirst({
			where: {
				rg,
			},
		});

		return idoso;
	}
	async findByUid(uid: string) {
		const idoso = await prisma.idoso.findUnique({
			where: {
				uid,
			},
			include: {
				responsavel_idoso: true,
				relatorio_pia: true,
				ficha_nutricional: true,
				usuario: true,
			},
		});

		return idoso;
	}
	async findById(id: bigint) {
		const idoso = await prisma.idoso.findUnique({
			where: {
				id,
			},
		});

		return idoso;
	}

	async update(data: UpdateIdosoDto, from: Idoso) {
		const idoso = await prisma.idoso.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return idoso;
	}
	async delete(data: DeleteIdosoDto, from: Idoso) {
		const idoso = await prisma.idoso.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return idoso;
	}
}
