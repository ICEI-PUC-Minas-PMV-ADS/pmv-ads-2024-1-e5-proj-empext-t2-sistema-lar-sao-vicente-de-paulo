import { Injectable } from '@nestjs/common';
import { CargoPermissao } from '../entities/modelo-cargo-permissao.entity';
import { PrismaCargoPermissaoRepository } from '../repositories/prisma/prisma-cargo-permissao-repository';

@Injectable()
export class FindUidCargoPermissaoService {
	constructor(private cargoPermissaoRepository: PrismaCargoPermissaoRepository) {}

	async execute(uid: string): Promise<CargoPermissao | null> {
		const cargoPermissoes = await this.cargoPermissaoRepository.findByUid(uid);
		return cargoPermissoes;
	}
}
