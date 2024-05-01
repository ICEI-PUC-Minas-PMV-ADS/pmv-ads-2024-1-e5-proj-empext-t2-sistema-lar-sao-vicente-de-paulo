import { Injectable } from '@nestjs/common';
import { UpdateCargoPermissaoDto } from '../dtos/update-cargo-permissao-dto';
import { PrismaCargoPermissaoRepository } from '../repositories/prisma/prisma-cargo-permissao-repository';

@Injectable()
export class UpdateCargoPermissaoService {
	constructor(private cargoPermissaoRepository: PrismaCargoPermissaoRepository) {}

	async execute(uid: string, data: UpdateCargoPermissaoDto): Promise<void> {
		await this.cargoPermissaoRepository.update(uid, data);
		return;
	}
}
