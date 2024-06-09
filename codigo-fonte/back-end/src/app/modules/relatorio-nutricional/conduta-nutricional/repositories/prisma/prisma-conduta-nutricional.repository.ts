import { CondutaNutricional } from '@prisma/client';
import { condutaNutricionalRepository } from '../conduta-nutricional.repository';
import { CreateCondutaNutricionalDto } from '../../dtos/create-conduta-nutricional.dto';
import { prisma } from '@/core/providers/database/prisma.service';
import { UpdateCondutaNutricionalDto } from '../../dtos/update-conduta-nutricional.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCondutaNutricionalRepository
	implements condutaNutricionalRepository
{
	async create(
		data: CreateCondutaNutricionalDto,
	): Promise<CondutaNutricional> {
		const condutaNutricional = await prisma.condutaNutricional.create({
			data,
		});

		return condutaNutricional;
	}
	async delete(uid: string): Promise<void> {
		await prisma.condutaNutricional.delete({
			where: {
				uid,
			},
		});
	}
	async findByUid(uid: string): Promise<CondutaNutricional | null> {
		const condutaNutricional = await prisma.condutaNutricional.findUnique({
			where: {
				uid,
			},
		});

		return condutaNutricional;
	}
	async findById(id: bigint): Promise<CondutaNutricional | null> {
		const condutaNutricional = await prisma.condutaNutricional.findUnique({
			where: {
				id,
			},
		});

		return condutaNutricional;
	}
	async update(
		data: UpdateCondutaNutricionalDto,
		from: CondutaNutricional,
	): Promise<CondutaNutricional> {
		const condutaNutricional = await prisma.condutaNutricional.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return condutaNutricional;
	}
}
