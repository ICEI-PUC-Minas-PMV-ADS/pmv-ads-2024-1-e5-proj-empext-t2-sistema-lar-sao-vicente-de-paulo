import { Injectable } from '@nestjs/common';
import { Prisma, RegistroAntropometrico } from '@prisma/client';
import { PrismaService } from '@/core/providers/database/prisma.service';

@Injectable()
export class FindAllRegistroAntropometricoService {
	constructor(private prisma: PrismaService) {}

	async execute(query: Prisma.RegistroAntropometricoFindManyArgs): Promise<{
		count: number;
		registrosAntropometrico: RegistroAntropometrico[];
	}> {
		const [registrosAntropometrico, count] = await this.prisma.$transaction(
			[
				this.prisma.registroAntropometrico.findMany(query),
				this.prisma.registroAntropometrico.count({
					where: query.where,
				}),
			],
		);

		return {
			count,
			registrosAntropometrico,
		};
	}
}
