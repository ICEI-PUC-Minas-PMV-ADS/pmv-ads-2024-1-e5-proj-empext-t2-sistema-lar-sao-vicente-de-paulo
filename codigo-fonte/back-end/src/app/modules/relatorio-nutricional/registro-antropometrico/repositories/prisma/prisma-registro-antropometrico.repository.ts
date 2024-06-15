import { RegistroAntropometrico } from '@prisma/client';
import { CreateRegistroAntropometricoDto } from '../../dtos/create-registro-antropometrico.dto';
import { prisma } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { registroAntropometricoRepository } from '../registro-antropometrico.repository';
import { UpdateRegistroAntropometricoDto } from '../../dtos/update-registro-antropometrico.dto';

@Injectable()
export class PrismaRegistroAntropometricoRepository
	implements registroAntropometricoRepository
{
	async create(
		data: CreateRegistroAntropometricoDto,
	): Promise<RegistroAntropometrico> {
		const registroAntropometrico =
			await prisma.registroAntropometrico.create({
				data,
			});

		return registroAntropometrico;
	}
	async findById(id: bigint): Promise<RegistroAntropometrico | null> {
		const registroAntropometrico =
			await prisma.registroAntropometrico.findUnique({
				where: { id },
			});

		return registroAntropometrico;
	}
	async findByUid(uid: string): Promise<RegistroAntropometrico | null> {
		const registroAntropometrico =
			await prisma.registroAntropometrico.findUnique({
				where: { uid },
			});

		return registroAntropometrico;
	}
	async update(
		data: UpdateRegistroAntropometricoDto,
		from: RegistroAntropometrico,
	): Promise<RegistroAntropometrico> {
		const registroAntropometrico =
			await prisma.registroAntropometrico.update({
				where: { id: from.id },
				data,
			});

		return registroAntropometrico;
	}
	async delete(uid: string): Promise<void> {
		await prisma.registroAntropometrico.delete({
			where: { uid },
		});
	}
}
