import { Injectable } from "@nestjs/common";
import { PrismaModeloRelatorioPiaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia.repository";
import { AppError } from "@utils/app-error";
import { UpdateModeloRelatorioPiaDto } from "../dtos/update-modelo-relatorio-pia.dto";
import { ModeloRelatorioPia } from "../entities/modelo-relatorio-pia.entity";
import { prisma } from "@/core/providers/database/prisma.service";

@Injectable()
export class UpdateModeloRelatorioPiaService {
    constructor(
        private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaRepository,
    ) {}
    async execute(uid: string, data: UpdateModeloRelatorioPiaDto): Promise<ModeloRelatorioPia | null> {
        const AlreadyExists = await this.modeloRelatorioPiaRepository.findByUid(uid);

        if (!AlreadyExists) {
            throw new AppError("Modelo de relatório PIA não encontrado");
        }

        if (AlreadyExists.nome === data.nome) {
            throw new AppError("Não houve mudanças no modelo de relatório PIA");
        }

        const modeloRelatorioPia = await this.modeloRelatorioPiaRepository.versioningUpdate(uid);

        await this.modeloRelatorioPiaRepository.update(data, modeloRelatorioPia)
        
        return modeloRelatorioPia;
    }
}