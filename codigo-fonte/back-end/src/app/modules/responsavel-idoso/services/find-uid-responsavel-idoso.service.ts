import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { ResponsavelIdoso } from '../entities/responsavel-idoso.entity';

@Injectable()
export class FindUidResponsavelIdosoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string): Promise<ResponsavelIdoso | null> {
		const responsavelIdoso = await this.prisma.responsavelIdoso.findFirst({
			where: {
				uid,
			},
		});

		return responsavelIdoso;
	}
}
