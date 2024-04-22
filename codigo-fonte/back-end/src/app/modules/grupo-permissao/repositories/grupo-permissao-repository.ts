import { GrupoPermissao } from "@prisma/client";

export interface grupoPermissaoRepository {
    findByUid(uid: string): Promise<GrupoPermissao | null>;
}