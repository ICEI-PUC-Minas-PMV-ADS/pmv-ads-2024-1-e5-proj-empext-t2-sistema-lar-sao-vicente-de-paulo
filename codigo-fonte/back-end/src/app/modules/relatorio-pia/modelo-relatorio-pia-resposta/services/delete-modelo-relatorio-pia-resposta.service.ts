import { Injectable } from "@nestjs/common";
import { AppError } from "@utils/app-error";
import { PrismaModeloRelatorioPiaRespostaRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia-resposta.repository";

@Injectable()
export class DeleteModeloRelatorioPiaRespostaService {
    constructor(
        private modeloRelatorioPiaRespostaRepository: PrismaModeloRelatorioPiaRespostaRepository,
    ) {}
    async execute(uid: string): Promise<void> {
        const modeloRelatorioPiaResposta = await this.modeloRelatorioPiaRespostaRepository.findByUid(uid);

        if (!modeloRelatorioPiaResposta) {
            throw new AppError("Modelo de pergunta do Relatório PIA não encontrado");
        }

        await this.modeloRelatorioPiaRespostaRepository.delete(uid);
    }
}