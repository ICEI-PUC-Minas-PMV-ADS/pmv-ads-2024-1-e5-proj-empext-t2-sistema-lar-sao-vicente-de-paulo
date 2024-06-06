import { AntropometriaNutricional } from '@prisma/client';
import { antropometriaRepository } from '../antropometria.repository';
import { CreateAntropometriaDto } from '../../dtos/create-antropometria.dto';
import { UpdateAntropometriaDto } from '../../dtos/update-antropometria.dto';
import { prisma } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAntropometriaRepository implements antropometriaRepository {
	async create(
		data: CreateAntropometriaDto,
	): Promise<AntropometriaNutricional> {
		const antropometria = await prisma.antropometriaNutricional.create({
			data,
		});

		return antropometria;
	}
	async findById(id: bigint): Promise<AntropometriaNutricional | null> {
		const antropometria = await prisma.antropometriaNutricional.findUnique({
			where: { id },
		});

		return antropometria;
	}
	async findByUid(uid: string): Promise<AntropometriaNutricional | null> {
		const antropometria = await prisma.antropometriaNutricional.findUnique({
			where: { uid },
		});

		return antropometria;
	}
	async update(
		data: UpdateAntropometriaDto,
		from: AntropometriaNutricional,
	): Promise<AntropometriaNutricional> {
		const antropometria = await prisma.antropometriaNutricional.update({
			where: { id: from.id },
			data,
		});

		return antropometria;
	}
	async delete(uid: string): Promise<void> {
		await prisma.antropometriaNutricional.delete({
			where: { uid },
		});
	}
}
