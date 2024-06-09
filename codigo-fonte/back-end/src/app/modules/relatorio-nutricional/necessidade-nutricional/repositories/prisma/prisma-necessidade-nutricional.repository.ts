import { NecessidadeNutricional } from '@prisma/client';
import { necessidadeNutricionalRepository } from '../necessidade-nutricional.repository';
import { CreateNecessidadeNutricionalDto } from '../../dtos/create-necessidade-nutricional.dto';
import { UpdateNecessidadeNutricionalDto } from '../../dtos/update-necessidade-nutricional.dto';
import { prisma } from '@/core/providers/database/prisma.service';

export class PrismaNecessidadeNutricionalRepository
	implements necessidadeNutricionalRepository
{
	async create(
		data: CreateNecessidadeNutricionalDto,
	): Promise<NecessidadeNutricional> {
		const necessidadeNutricional =
			await prisma.necessidadeNutricional.create({
				data,
			});

		return necessidadeNutricional;
	}
	async findById(id: bigint): Promise<NecessidadeNutricional | null> {
		const necessidadeNutricional =
			await prisma.necessidadeNutricional.findUnique({
				where: { id },
			});

		return necessidadeNutricional;
	}
	async findByUid(uid: string): Promise<NecessidadeNutricional | null> {
		const necessidadeNutricional =
			await prisma.necessidadeNutricional.findUnique({
				where: { uid },
			});

		return necessidadeNutricional;
	}
	async update(
		data: UpdateNecessidadeNutricionalDto,
		from: NecessidadeNutricional,
	): Promise<NecessidadeNutricional> {
		const necessidadeNutricional =
			await prisma.necessidadeNutricional.update({
				where: { id: from.id },
				data,
			});

		return necessidadeNutricional;
	}
	async delete(uid: string): Promise<void> {
		await prisma.necessidadeNutricional.delete({
			where: { uid },
		});
	}
}
