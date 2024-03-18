import { Idoso, Prisma } from "@prisma/client";

export interface idosoRepository {
    create(data: Prisma.IdosoUncheckedCreateInput): Promise<Idoso>
    findByCpf(cpf: string): Promise<Idoso | null>
}