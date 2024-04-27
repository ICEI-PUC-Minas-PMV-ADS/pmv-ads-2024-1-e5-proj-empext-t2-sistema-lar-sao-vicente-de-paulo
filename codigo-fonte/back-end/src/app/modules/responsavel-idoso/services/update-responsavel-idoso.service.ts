import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateResponsavelIdosoDto } from '../dtos/update-responsavel-idoso.dto';

@Injectable()
export class UpdateResponsavelIdosoService {
	constructor(private prisma: PrismaService) {}

	async execute(uid: string, data: UpdateResponsavelIdosoDto): Promise<void> {
		await this.prisma.responsavelIdoso.update({
			where: {
				uid,
			},
			data,
		});

		return;
	}
}
