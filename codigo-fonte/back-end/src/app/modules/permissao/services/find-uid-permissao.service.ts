import { Injectable } from '@nestjs/common';
import { Permissao } from '../entities/permissao.entity';
import { PrismaPermissaoRepository } from '../repositories/prisma/prima-permissao-repository';

@Injectable()
export class FindUidPermissaoService {
	constructor(private permissaoRepository: PrismaPermissaoRepository) {}

	async execute(uid: string): Promise<Permissao | null> {
		const permissao = await this.permissaoRepository.findByUid(uid);
		return permissao;
	}
}
