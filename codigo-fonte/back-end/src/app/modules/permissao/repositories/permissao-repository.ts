import { Permissao } from "@prisma/client";

export interface permissaoRepository {
    findByUid(uid: string): Promise<Permissao | null>;
}