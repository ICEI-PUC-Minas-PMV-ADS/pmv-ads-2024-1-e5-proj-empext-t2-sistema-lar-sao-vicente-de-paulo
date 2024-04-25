import { Injectable } from "@nestjs/common";
import { AppError } from "@utils/app-error";
import { PrismaModeloRelatorioPiaPerguntaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia-pergunta.repository";
import { ModeloRelatorioPiaPergunta } from "../entities/modelo-relatorio-pia-pergunta.entity";
import { CreateModeloRelatorioPiaPerguntaDto } from "../dtos/create-modelo-relatorio-pia-pergunta.dto";

@Injectable()
export class CreateModeloRelatorioPiaPerguntaService {
    constructor(
        private modeloRelatorioPiaPerguntaRepository: PrismaModeloRelatorioPiaPerguntaRepository,
    ) {}
    async execute(data: CreateModeloRelatorioPiaPerguntaDto): Promise<ModeloRelatorioPiaPergunta> {
        const alreadyExists = await this.modeloRelatorioPiaPerguntaRepository.findByPergunta(data.pergunta);

        if (alreadyExists) {
            throw new AppError('Pergunta já existente');
        }

        const modeloRelatorioPia = await this.modeloRelatorioPiaPerguntaRepository.create(data);
        
        return modeloRelatorioPia;
    }
}