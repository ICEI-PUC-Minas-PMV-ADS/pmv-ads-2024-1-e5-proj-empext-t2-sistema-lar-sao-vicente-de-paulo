import { prisma } from "@/core/providers/database/prisma.service";
import { modeloRelatorioPiaOpcaoRepository } from "../modelo-relatoria-pia-opcao.repository";
import { ModeloRelatorioPiaRespostaOpcao } from "../../entities/modelo-relatorio-pia-opcao";
import { CreateModeloRelatorioPiaOpcaoDto } from "../../dtos/create-modelo-relatorio-pia-opcao.dto";
import { UpdateModeloRelatorioPiaOpcaoDto } from "../../dtos/update-modelo-relatorio-pia-opcao.dto";

export class PrismaModeloRelatorioPiaOpcaoRepository implements modeloRelatorioPiaOpcaoRepository {
    async create(data: CreateModeloRelatorioPiaOpcaoDto): Promise<ModeloRelatorioPiaRespostaOpcao> {
        const modeloRelatorioPiaOpcao = await prisma.modeloRelatorioPiaRespostaOpcao.create({
            data
        });
        
        return modeloRelatorioPiaOpcao;
    }
    async findByUid(uid: string): Promise<ModeloRelatorioPiaRespostaOpcao | null> {
        const modeloRelatorioPiaOpcao = await prisma.modeloRelatorioPiaRespostaOpcao.findUnique({
            where: {
                uid
            }
        });

        return modeloRelatorioPiaOpcao;
    }
    async update(data: UpdateModeloRelatorioPiaOpcaoDto, from: ModeloRelatorioPiaRespostaOpcao): Promise<ModeloRelatorioPiaRespostaOpcao> {
        const modeloRelatorioPiaOpcao = await prisma.modeloRelatorioPiaRespostaOpcao.update({
            where: {
                uid: from.uid
            },
            data
        });

        return modeloRelatorioPiaOpcao;
    }
    async delete(uid: string): Promise<void> {
        await prisma.modeloRelatorioPiaRespostaOpcao.delete({
            where: {
                uid
            }
        });
    }
}