import { Injectable } from "@nestjs/common";
import { CreateModeloRelatorioPiaOpcaoDto } from "../dtos/create-modelo-relatorio-pia-opcao.dto";
import { PrismaModeloRelatorioPiaOpcaoRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia-opcao.repository";
import { ModeloRelatorioPiaRespostaOpcao } from "../entities/modelo-relatorio-pia-opcao";

@Injectable()
export class CreateModeloRelatorioPiaOpcaoService {
    constructor(
        private modeloRelatorioPiaOpcaoRepository: PrismaModeloRelatorioPiaOpcaoRepository,
    ) {}
    async execute(data: CreateModeloRelatorioPiaOpcaoDto): Promise<ModeloRelatorioPiaRespostaOpcao> {

        const modeloRelatorioPiaOpcao = await this.modeloRelatorioPiaOpcaoRepository.create(data);
        
        return modeloRelatorioPiaOpcao;
    }
}