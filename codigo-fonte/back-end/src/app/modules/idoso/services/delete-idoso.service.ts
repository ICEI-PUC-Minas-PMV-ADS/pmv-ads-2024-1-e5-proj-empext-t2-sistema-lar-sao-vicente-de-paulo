import { PrismaIdosoRepository } from "@/repositories/prisma/prisma-idoso-repository";
import { Injectable } from "@nestjs/common";
import { Idoso } from "../entities/idoso.entity";
import { AppError } from "@utils/app-error";
import { DeleteIdosoDto } from "../dtos/delete-idoso.dto";

@Injectable()
export class DeleteIdosoService {
    constructor(private idosoRepository: PrismaIdosoRepository) { }

    async execute(data: DeleteIdosoDto, uid: string): Promise<Idoso> {
        const idoso = await this.idosoRepository.findByUid(uid)

        if (!idoso) {
            throw new AppError('Nenhum usuário encontrado');
        }

        await this.idosoRepository.save(data, idoso)

        return idoso

    }
}