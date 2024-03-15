import { Prisma, Usuario } from "@prisma/client";

export interface usuarioRepository {
    create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
    findByUid(uid: string): Promise<Usuario | null>;
    findByCpf(cpf_cnh: string): Promise<Usuario | null>;
    alreadyExists(email: string, cpf_cnh: string): Promise<Usuario | null>;
    update(usuario: Usuario): Promise<Usuario>;
    delete(uid: string): Promise<void>;
}
