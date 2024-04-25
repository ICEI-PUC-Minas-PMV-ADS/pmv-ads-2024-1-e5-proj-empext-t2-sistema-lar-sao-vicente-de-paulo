import { Injectable } from "@nestjs/common";
import { AppError } from "@utils/app-error";
import { PrismaModeloRelatorioPiaPerguntaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia-pergunta.repository";

@Injectable()
export class DeleteModeloRelatorioPiaPerguntaService {
    constructor(
        private modeloRelatorioPiaRepository: PrismaModeloRelatorioPiaPerguntaRepository,
    ) {}
    async execute(uid: string): Promise<void> {
        const modeloRelatorioPiaPergunta = await this.modeloRelatorioPiaRepository.findByUid(uid);

        if (!modeloRelatorioPiaPergunta) {
            throw new AppError("Modelo de pergunta do Relatório PIA não encontrado");
        }

        await this.modeloRelatorioPiaRepository.delete(uid);
    }
}