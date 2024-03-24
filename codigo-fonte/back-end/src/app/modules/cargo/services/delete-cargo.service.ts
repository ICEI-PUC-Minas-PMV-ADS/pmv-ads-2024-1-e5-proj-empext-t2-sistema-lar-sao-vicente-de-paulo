import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCargoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string): Promise<void> {
		await this.prisma.cargo.delete({
			where: {
				uid,
			},
		});

		return;
	}
}
