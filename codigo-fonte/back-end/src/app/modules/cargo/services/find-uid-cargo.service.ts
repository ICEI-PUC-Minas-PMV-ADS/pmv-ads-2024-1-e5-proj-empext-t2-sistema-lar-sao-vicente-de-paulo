import { Injectable } from '@nestjs/common';
import { Cargo } from '../entities/cargo.entity';
import { PrismaCargoRepository } from '../repositories/prisma/prisma-cargo-repository';

@Injectable()
export class FindUidCargoService {
	constructor(private cargoRepository: PrismaCargoRepository) {}

	async execute(uid: string): Promise<Cargo | null> {
		const modeloPermissao = await this.cargoRepository.findByUid(uid);
		return modeloPermissao;
	}
}
