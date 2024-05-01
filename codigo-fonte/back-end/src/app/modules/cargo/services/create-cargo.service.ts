import { PrismaService } from '@/core/providers/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCargoDto } from '../dtos/create-cargo-dto';
import { PrismaCargoRepository } from '../repositories/prisma/prisma-cargo-repository';
import { PrismaCargoPermissaoRepository } from '../../cargo-permissao/repositories/prisma/prisma-cargo-permissao-repository';

@Injectable()
export class CreateCargoService {
	constructor(
		private prisma: PrismaService,
		private cargoRepository: PrismaCargoRepository,
		private cargoPermissaoRepository: PrismaCargoPermissaoRepository
	) {}

	async execute(data: CreateCargoDto): Promise<void> {
		const cargo = await this.cargoRepository.create(data);

		const permissoes = await data.permissoes.map((permissao) => ({
			...permissao,
			id_cargo: cargo.id,
		}));

		await this.cargoPermissaoRepository.createMany(permissoes);

		return;
	}
}
