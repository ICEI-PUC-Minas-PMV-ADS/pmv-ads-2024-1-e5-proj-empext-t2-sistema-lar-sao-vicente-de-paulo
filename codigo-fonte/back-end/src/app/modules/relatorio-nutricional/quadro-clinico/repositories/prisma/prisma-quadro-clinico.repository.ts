import { QuadroClinico } from '@prisma/client';
import { quadroClinicoRepository } from '../quadro-clinico.repository';
import { CreateQuadroClinicoDto } from '../../dtos/create-quadro-clinico.dto';
import { prisma } from '@/core/providers/database/prisma.service';
import { UpdateQuadroClinicoDto } from '../../dtos/update-quadro-clinico.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuadroClinicoRepository implements quadroClinicoRepository {
	async create(data: CreateQuadroClinicoDto): Promise<QuadroClinico> {
		const quadroClinico = await prisma.quadroClinico.create({
			data,
		});

		return quadroClinico;
	}
	async delete(uid: string): Promise<void> {
		await prisma.quadroClinico.delete({
			where: {
				uid,
			},
		});
	}
	async findByUid(uid: string): Promise<QuadroClinico | null> {
		const quadroClinico = await prisma.quadroClinico.findUnique({
			where: {
				uid,
			},
		});

		return quadroClinico;
	}
	async findById(id: bigint): Promise<QuadroClinico | null> {
		const quadroClinico = await prisma.quadroClinico.findUnique({
			where: {
				id,
			},
		});

		return quadroClinico;
	}
	async update(
		data: UpdateQuadroClinicoDto,
		from: QuadroClinico,
	): Promise<QuadroClinico> {
		const quadroClinico = await prisma.quadroClinico.update({
			where: {
				uid: from.uid,
			},
			data,
		});

		return quadroClinico;
	}
}
