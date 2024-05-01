import { Injectable } from "@nestjs/common";
import { CreateModeloRelatorioPiaDto } from "../dtos/create-modelo-relatorio-pia.dto";
import { ModeloRelatorioPia } from "../entities/modelo-relatorio-pia.entity";
import { PrismaModeloRelatorioPiaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia.repository";
import { AppError } from "@utils/app-error";

@Injectable()
export class CreateModeloRelatorioPiaService {
    constructor(
        private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaRepository,
    ) {}
    async execute(data: CreateModeloRelatorioPiaDto): Promise<ModeloRelatorioPia> {
        const alreadyExists = await this.modeloRelatorioPiaRepository.findByNome(data.nome);

        if (alreadyExists) {
            throw new AppError('Modelo de relatório PIA com este nome já existe.');
        }

        const modeloRelatorioPia = await this.modeloRelatorioPiaRepository.create(data);
        
        return modeloRelatorioPia;
    }
}