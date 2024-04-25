import { Injectable } from "@nestjs/common";
import { CreateModeloRelatorioPiaDto } from "../dtos/create-modelo-relatorio-pia.dto";
import { ModeloRelatorioPia } from "../entities/modelo-relatorio-pia.entity";
import { PrismaModeloRelatorioPiaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia.repository";

@Injectable()
export class CreateModeloRelatorioPiaService {
    constructor(
        private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaRepository,
    ) {}
    async execute(data: CreateModeloRelatorioPiaDto): Promise<ModeloRelatorioPia> {
        const modeloRelatorioPia = await this.modeloRelatorioPiaRepository.create(data);
        
        return modeloRelatorioPia;
    }
}