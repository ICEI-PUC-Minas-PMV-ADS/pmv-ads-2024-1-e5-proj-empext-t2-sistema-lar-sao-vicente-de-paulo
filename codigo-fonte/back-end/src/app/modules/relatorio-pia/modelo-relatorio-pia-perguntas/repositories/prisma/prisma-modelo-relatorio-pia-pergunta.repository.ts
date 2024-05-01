import { prisma } from "@/core/providers/database/prisma.service";
import { CreateModeloRelatorioPiaPerguntaDto } from "../../dtos/create-modelo-relatorio-pia-pergunta.dto";
import { UpdateModeloRelatorioPiaPerguntaDto } from "../../dtos/update-modelo-relatorio-pia-pergunta.dto";
import { ModeloRelatorioPiaPergunta } from "../../entities/modelo-relatorio-pia-pergunta.entity";
import { modeloRelatorioPiaPerguntaRepository } from "../modelo-relatorio-pia-pergunta-repository";

export class PrismaModeloRelatorioPiaPerguntaRepository implements modeloRelatorioPiaPerguntaRepository {
    async create(data: CreateModeloRelatorioPiaPerguntaDto): Promise<ModeloRelatorioPiaPergunta> {
        const modeloRelatorioPiaPergunta = await prisma.modeloRelatorioPiaPergunta.create({
            data
        });
        
        return modeloRelatorioPiaPergunta;
    }
    async findByUid(uid: string): Promise<ModeloRelatorioPiaPergunta | null> {
        const modeloRelatorioPiaPergunta = await prisma.modeloRelatorioPiaPergunta.findUnique({
            where: {
                uid
            },
            include: {
                modelo_relatorio_pia: true,
                modelo_relatorio_pia_resposta: true,
            }
        });

        return modeloRelatorioPiaPergunta;
    }
    async update(data: UpdateModeloRelatorioPiaPerguntaDto, from: ModeloRelatorioPiaPergunta): Promise<ModeloRelatorioPiaPergunta> {
        const modeloRelatorioPiaPergunta = await prisma.modeloRelatorioPiaPergunta.update({
            where: {
                uid: from.uid
            },
            data
        });

        return modeloRelatorioPiaPergunta;
    }
    async findByPergunta(pergunta: string): Promise<ModeloRelatorioPiaPergunta | null> {
        const modeloRelatorioPiaPergunta = await prisma.modeloRelatorioPiaPergunta.findFirst({
            where: {
                pergunta
            }
        });

        return modeloRelatorioPiaPergunta;
    }
    async delete(uid: string): Promise<void> {
        await prisma.modeloRelatorioPiaPergunta.delete({
            where: {
                uid
            }
        });
    }
}