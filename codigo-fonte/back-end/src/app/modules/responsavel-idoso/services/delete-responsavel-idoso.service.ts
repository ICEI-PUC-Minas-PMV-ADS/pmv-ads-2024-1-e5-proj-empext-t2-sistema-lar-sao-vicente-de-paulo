import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteResponsavelIdosoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string): Promise<void> {
		await this.prisma.responsavelIdoso.delete({
			where: {
				uid,
			},
		});

		return;
	}
}
