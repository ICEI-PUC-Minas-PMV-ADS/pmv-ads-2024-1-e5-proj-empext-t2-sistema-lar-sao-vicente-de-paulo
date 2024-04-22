import { Injectable } from '@nestjs/common';
import { GrupoPermissao } from '../entities/grupo-permissao.entity';
import { PrismaGrupoPermissaoRepository } from '../repositories/prisma/prisma-grupo-permissao-repository';

@Injectable()
export class FindUidGrupoPermissaoService {
	constructor(private grupoPermissaoRepository: PrismaGrupoPermissaoRepository) {}

	async execute(uid: string): Promise<GrupoPermissao | null> {
		const grupoPermissao = await this.grupoPermissaoRepository.findByUid(uid);
		return grupoPermissao;
	}
}
