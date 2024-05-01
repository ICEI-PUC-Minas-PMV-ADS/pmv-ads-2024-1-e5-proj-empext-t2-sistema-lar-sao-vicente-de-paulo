import { Injectable } from '@nestjs/common';
import { PrismaCargoPermissaoRepository } from '../repositories/prisma/prisma-cargo-permissao-repository';

@Injectable()
export class DeleteCargoPermissaoService {
	constructor(private cargoPermissaoRepository: PrismaCargoPermissaoRepository) {}

	async execute(uid: string): Promise<void> {
		await this.cargoPermissaoRepository.delete(uid);
		return;
	}
}
