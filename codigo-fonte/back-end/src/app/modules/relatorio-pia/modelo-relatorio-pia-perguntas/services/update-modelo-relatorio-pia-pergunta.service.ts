import { Injectable } from "@nestjs/common";
import { AppError } from "@utils/app-error";
import { PrismaModeloRelatorioPiaPerguntaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia-pergunta.repository";
import { UpdateModeloRelatorioPiaPerguntaDto } from "../dtos/update-modelo-relatorio-pia-pergunta.dto";
import { ModeloRelatorioPiaPergunta } from "../entities/modelo-relatorio-pia-pergunta.entity";

@Injectable()
export class UpdateModeloRelatorioPiaPerguntaService {
    constructor(
        private modeloRelatorioPiaPerguntaRepository: PrismaModeloRelatorioPiaPerguntaRepository,
    ) {}
    async execute(uid: string, data: UpdateModeloRelatorioPiaPerguntaDto): Promise<ModeloRelatorioPiaPergunta | null> {
        const alreadyExists = await this.modeloRelatorioPiaPerguntaRepository.findByUid(uid);

        if (!alreadyExists) {
            throw new AppError("Modelo de relatório PIA não encontrado");
        }

        const modeloRelatoriaPiaPergunta = await this.modeloRelatorioPiaPerguntaRepository.update(data, alreadyExists)
        
        return modeloRelatoriaPiaPergunta;
    }
}