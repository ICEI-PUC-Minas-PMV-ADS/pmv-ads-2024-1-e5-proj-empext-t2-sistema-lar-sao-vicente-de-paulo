import { FichaNutricional, Prisma } from '@prisma/client';
import { fichaNutricionalRepository } from '../ficha-nutricional.repository';
import { CreateFichaNutricionalDto } from '../../dtos/create-ficha-nutricional';
import { prisma } from '@/core/providers/database/prisma.service';

export class PrismaFichaNutricionalRepository
	implements fichaNutricionalRepository
{
	async create(data: CreateFichaNutricionalDto): Promise<FichaNutricional> {
		const fichaNutricional = await prisma.fichaNutricional.create({
			data,
		});

		return fichaNutricional;
	}
	async findById(id: bigint): Promise<FichaNutricional | null> {
		const fichaNutricional = await prisma.fichaNutricional.findUnique({
			where: {
				id,
			},
		});

		return fichaNutricional;
	}
	async findByUid(uid: string): Promise<FichaNutricional | null> {
		const fichaNutricional = await prisma.fichaNutricional.findUnique({
			where: {
				uid,
			},
		});

		return fichaNutricional;
	}
	async update(
		data: Prisma.FichaNutricionalUncheckedUpdateInput,
		from: FichaNutricional,
	): Promise<FichaNutricional> {
		const fichaNutricional = await prisma.fichaNutricional.update({
			where: {
				id: from.id,
			},
			data,
		});

		return fichaNutricional;
	}
	async delete(uid: string): Promise<void> {
		await prisma.fichaNutricional.delete({
			where: {
				uid,
			},
		});
	}
}
