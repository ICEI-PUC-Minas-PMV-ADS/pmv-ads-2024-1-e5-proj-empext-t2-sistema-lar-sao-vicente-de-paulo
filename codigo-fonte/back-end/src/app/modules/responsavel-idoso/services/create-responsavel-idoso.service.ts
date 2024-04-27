import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateResponsavelIdosoDto } from '../dtos/create-responsavel-idoso.dto';

@Injectable()
export class CreateResponsavelIdosoService {
	constructor(private prisma: PrismaService) {}

	async execute(data: CreateResponsavelIdosoDto): Promise<void> {
		await this.prisma.responsavelIdoso.create({
			data,
		});

		return;
	}
}
