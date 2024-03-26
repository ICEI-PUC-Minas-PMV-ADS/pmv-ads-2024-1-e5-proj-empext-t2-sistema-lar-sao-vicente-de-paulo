import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCargoDto } from '../dtos/create-cargo-dto';

@Injectable()
export class CreateCargoService {
	constructor(private prisma: PrismaService) {}

	async execute(data: CreateCargoDto): Promise<void> {
		await this.prisma.cargo.create({
			data,
		});

		return;
	}
}
