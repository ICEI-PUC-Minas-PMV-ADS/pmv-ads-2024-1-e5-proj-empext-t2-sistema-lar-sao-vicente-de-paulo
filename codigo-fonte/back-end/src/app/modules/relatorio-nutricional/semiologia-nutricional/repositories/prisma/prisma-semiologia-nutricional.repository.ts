import { SemiologiaNutricional } from '@prisma/client';
import { semiologiaNutricionalRepository } from '../semiologia-nutricional.repository';
import { CreateSemiologiaNutricionalDto } from '../../dtos/create-semiologia-nutricional.dto';
import { prisma } from '@/core/providers/database/prisma.service';
import { UpdateSemiologiaNutricionalDto } from '../../dtos/update-semiologia-nutricional.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaSemiologiaNutricionalRepository
	implements semiologiaNutricionalRepository
{
	async create(
		data: CreateSemiologiaNutricionalDto,
	): Promise<SemiologiaNutricional> {
		const semiologiaNutricional = await prisma.semiologiaNutricional.create(
			{
				data,
			},
		);

		return semiologiaNutricional;
	}
	async delete(uid: string): Promise<void> {
		await prisma.semiologiaNutricional.delete({
			where: {
				uid,
			},
		});
	}
	async findByUid(uid: string): Promise<SemiologiaNutricional | null> {
		const semiologiaNutricional =
			await prisma.semiologiaNutricional.findUnique({
				where: {
					uid,
				},
			});

		return semiologiaNutricional;
	}
	async findById(id: bigint): Promise<SemiologiaNutricional | null> {
		const semiologiaNutricional =
			await prisma.semiologiaNutricional.findUnique({
				where: {
					id,
				},
			});

		return semiologiaNutricional;
	}
	async update(
		data: UpdateSemiologiaNutricionalDto,
		from: SemiologiaNutricional,
	): Promise<SemiologiaNutricional> {
		const semiologiaNutricional = await prisma.semiologiaNutricional.update(
			{
				where: {
					uid: from.uid,
				},
				data,
			},
		);

		return semiologiaNutricional;
	}
}
