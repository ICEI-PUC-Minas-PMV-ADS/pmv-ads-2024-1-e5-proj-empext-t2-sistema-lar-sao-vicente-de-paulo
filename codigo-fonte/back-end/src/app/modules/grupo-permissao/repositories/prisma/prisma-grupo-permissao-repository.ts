import { GrupoPermissao } from "@prisma/client";
import { grupoPermissaoRepository } from "../grupo-permissao-repository";
import { prisma } from "@/core/providers/database/prisma.service";

export class PrismaGrupoPermissaoRepository implements grupoPermissaoRepository {
    
    async findByUid(uid:string): Promise<GrupoPermissao | null> {
        const grupoPermissao = await prisma.grupoPermissao.findFirst({
			where: {
				uid,
			},
		});

        return grupoPermissao;
    }
}