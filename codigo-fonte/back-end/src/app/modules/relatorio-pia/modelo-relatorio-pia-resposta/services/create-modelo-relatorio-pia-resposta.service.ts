import { Injectable } from "@nestjs/common";
import { CreateModeloRelatorioPiaRespostaDto } from "../dtos/create-modelo-relatorio-pia-resposta.dto";
import { PrismaModeloRelatorioPiaRespostaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia-resposta.repository";
import { ModeloRelatorioPiaResposta } from "../entities/modelo-relatorio-pia-resposta.entity";

@Injectable()
export class CreateModeloRelatorioPiaRespostaService {
    constructor(
        private modeloRelatorioPiaRespostaRepository: PrismaModeloRelatorioPiaRespostaRepository,
    ) {}
    async execute(data: CreateModeloRelatorioPiaRespostaDto): Promise<ModeloRelatorioPiaResposta> {

        const modeloRelatorioPiaResposta = await this.modeloRelatorioPiaRespostaRepository.create(data);
        
        return modeloRelatorioPiaResposta;
    }
}