import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCargoPermissaoDto } from '../dtos/create-cargo-permissao-dto';

@Injectable()
export class CreateCargoPermissaoService {
	constructor(private prisma: PrismaService) {}

	async execute(data: CreateCargoPermissaoDto): Promise<void> {
		await this.prisma.cargoPermissao.create({
			data,
		});

		return;
	}
}
