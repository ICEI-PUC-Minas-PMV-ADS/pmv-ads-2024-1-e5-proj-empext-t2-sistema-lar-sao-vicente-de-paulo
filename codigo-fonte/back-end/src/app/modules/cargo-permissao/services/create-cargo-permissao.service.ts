import { Injectable } from '@nestjs/common';
import { CreateCargoPermissaoDto } from '../dtos/create-cargo-permissao-dto';
import { PrismaCargoPermissaoRepository } from '../repositories/prisma/prisma-cargo-permissao-repository';

@Injectable()
export class CreateCargoPermissaoService {
	constructor(private cargoPermissaoRepository: PrismaCargoPermissaoRepository) {}

	async execute(data: CreateCargoPermissaoDto): Promise<void> {
		await this.cargoPermissaoRepository.create(data);
		return;
	}
}
