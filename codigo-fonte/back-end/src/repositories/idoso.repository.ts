import { DeleteIdosoDto } from "@/app/modules/idoso/dtos/delete-idoso.dto";
import { Idoso, Prisma } from "@prisma/client";

export interface idosoRepository {
    create(data: Prisma.IdosoUncheckedCreateInput): Promise<Idoso>
    findByCpf(cpf: string): Promise<Idoso | null>
    findByUid(uid: string): Promise<Idoso | null>
    save(data: DeleteIdosoDto, from: Idoso): Promise<Idoso>
}