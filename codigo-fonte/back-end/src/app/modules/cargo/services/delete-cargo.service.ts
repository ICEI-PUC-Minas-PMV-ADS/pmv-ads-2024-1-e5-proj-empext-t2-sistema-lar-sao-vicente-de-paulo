import { Injectable } from '@nestjs/common';
import { PrismaCargoRepository } from '../repositories/prisma/prisma-cargo-repository';

@Injectable()
export class DeleteCargoService {
	constructor(private cargoRepository: PrismaCargoRepository) {}

	async execute(uid: string): Promise<void> {
		await this.cargoRepository.delete(uid);
	}
}
