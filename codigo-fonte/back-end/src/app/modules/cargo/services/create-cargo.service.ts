import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCargoDto } from '../dtos/create-cargo-dto';

@Injectable()
export class CreateCargoService {
	constructor(private prisma: PrismaService) {}

	async execute(data: CreateCargoDto): Promise<void> {
		const cargo = await this.prisma.cargo.create({
			data: { nome: data.nome },
		});

		const permissoes = await data.permissoes.map((permissao) => ({
			...permissao,
			id_cargo: cargo.id,
		}));

		await this.prisma.cargoPermissao.createMany({
			data: permissoes,
		});

		return;
	}
}
