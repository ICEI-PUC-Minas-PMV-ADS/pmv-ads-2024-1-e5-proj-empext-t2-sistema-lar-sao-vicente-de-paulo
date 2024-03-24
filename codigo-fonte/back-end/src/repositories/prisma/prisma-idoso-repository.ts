import { Idoso, Prisma } from '@prisma/client';
import { idosoRepository } from '../idoso.repository';
import { DeleteIdosoDto } from '@/app/modules/idoso/dtos/delete-idoso.dto';
import { UpdateIdosoDto } from '@/app/modules/idoso/dtos/update-idoso.dto';
import { PrismaService } from '@/core/providers/database/prisma.service';

export class PrismaIdosoRepository implements idosoRepository {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.IdosoUncheckedCreateInput) {
		const idoso = await this.prisma.idoso.create({
			data,
		});

		return idoso;
	}

	async findByCpf(cpf: string) {
		const idoso = await this.prisma.idoso.findUnique({
			where: {
				cpf,
			},
		});

		return idoso;
	}

	async findByUid(uid: string) {
		const idoso = await this.prisma.idoso.findUnique({
			where: {
				uid,
			},
			include: {
				responsaveis_idoso: true,
				prontuarios: true,
				relatorios_pia: true,
				fichas_nutricionais: true,
				perroca: true,
				escala_braden: true,
			},
		});

		return idoso;
	}

	async update(data: UpdateIdosoDto, from: Idoso) {
		const idoso = await this.prisma.idoso.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return idoso;
	}

	async delete(data: DeleteIdosoDto, from: Idoso) {
		const idoso = await this.prisma.idoso.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return idoso;
	}
}
