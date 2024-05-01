import { prisma } from "@/core/providers/database/prisma.service";
import { Permissao } from "@prisma/client";
import { permissaoRepository } from "../permissao-repository";

export class PrismaPermissaoRepository implements permissaoRepository{
    
    async findByUid(uid:string): Promise<Permissao | null> {
        const permissao = await prisma.permissao.findFirst({
			where: {
				uid,
			},
		});

        return permissao;
    }
}