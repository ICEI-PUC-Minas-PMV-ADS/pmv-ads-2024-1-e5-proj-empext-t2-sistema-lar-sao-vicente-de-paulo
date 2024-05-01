import { prisma } from "@/core/providers/database/prisma.service";
import { modeloRelatorioPiaRespostaRepository } from "../modelo-relatorio-pia-resposta-repository";
import { ModeloRelatorioPiaResposta } from "../../entities/modelo-relatorio-pia-resposta.entity";
import { CreateModeloRelatorioPiaRespostaDto } from "../../dtos/create-modelo-relatorio-pia-resposta.dto";
import { UpdateModeloRelatorioPiaRespostaDto } from "../../dtos/update-modelo-relatorio-pia-resposta.dto";

export class PrismaModeloRelatorioPiaRespostaRepository implements modeloRelatorioPiaRespostaRepository {
    async create(data: CreateModeloRelatorioPiaRespostaDto): Promise<ModeloRelatorioPiaResposta> {
        const modeloRelatorioPiaResposta = await prisma.modeloRelatorioPiaResposta.create({
            data
        });
        
        return modeloRelatorioPiaResposta;
    }
    async findByUid(uid: string): Promise<ModeloRelatorioPiaResposta | null> {
        const modeloRelatorioPiaResposta = await prisma.modeloRelatorioPiaResposta.findUnique({
            where: {
                uid
            },
            include: {
                modelo_relatorio_pia_pergunta: true,
                modelo_relatorio_pia_resposta_opcao: true,
            }
        });

        return modeloRelatorioPiaResposta;
    }
    async update(data: UpdateModeloRelatorioPiaRespostaDto, from: ModeloRelatorioPiaResposta): Promise<ModeloRelatorioPiaResposta> {
        const modeloRelatorioPiaResposta = await prisma.modeloRelatorioPiaResposta.update({
            where: {
                uid: from.uid
            },
            data
        });

        return modeloRelatorioPiaResposta;
    }
    async delete(uid: string): Promise<void> {
        await prisma.modeloRelatorioPiaResposta.delete({
            where: {
                uid
            }
        });
    }
}