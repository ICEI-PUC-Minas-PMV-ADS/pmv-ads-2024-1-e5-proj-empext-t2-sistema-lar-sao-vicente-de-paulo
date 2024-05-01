import { Injectable } from "@nestjs/common";
import { AppError } from "@utils/app-error";
import { UpdateModeloRelatorioPiaOpcaoDto } from "../dtos/update-modelo-relatorio-pia-opcao.dto";
import { ModeloRelatorioPiaRespostaOpcao } from "../entities/modelo-relatorio-pia-opcao";
import { PrismaModeloRelatorioPiaOpcaoRepository } from "../repositories/prisma/prisma-modelo-relatorio-pia-opcao.repository";

@Injectable()
export class UpdateModeloRelatorioPiaOpcaoService {
    constructor(
        private modeloRelatorioPiaOpcaoRepository: PrismaModeloRelatorioPiaOpcaoRepository,
    ) {}
    async execute(uid: string, data: UpdateModeloRelatorioPiaOpcaoDto): Promise<ModeloRelatorioPiaRespostaOpcao | null> {
        const alreadyExists = await this.modeloRelatorioPiaOpcaoRepository.findByUid(uid);

        if (!alreadyExists) {
            throw new AppError("Modelo de opção de resposta não encontrado");
        }

        const modeloRelatoriaPiaOpcao = await this.modeloRelatorioPiaOpcaoRepository.update(data, alreadyExists)
        
        return modeloRelatoriaPiaOpcao;
    }
}