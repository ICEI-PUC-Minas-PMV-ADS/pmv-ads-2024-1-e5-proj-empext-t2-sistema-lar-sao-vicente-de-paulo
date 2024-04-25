import { prisma } from "@/core/providers/database/prisma.service";
import { modeloRelatorioPiaRepository } from "../modelo-relatorio-pia.repository";
import { ModeloRelatorioPia } from "@prisma/client";
import { UpdateModeloRelatorioPiaDto } from "../../dtos/update-modelo-relatorio-pia.dto";

export class PrismaModeloRelatorioPiaRepository implements modeloRelatorioPiaRepository{
    async versioningUpdate(uid: string) {
        const modeloRelatorioPia = await prisma.modeloRelatorioPia.findUnique({
            where: { uid },
          });

          if (!modeloRelatorioPia) {
            throw new Error('Modelo de relatório PIA não encontrado.');
          }
        
          return await prisma.modeloRelatorioPia.update({
            where: { uid },
            data: {
              versao: {increment: 1} 
            },
          });
    }

    async create(data) {
        const modeloRelatorioPia = await prisma.modeloRelatorioPia.create({
            data,
        });
        
        return modeloRelatorioPia;
    }
    async findByUid(uid: string) {
        const modeloRelatorioPia = await prisma.modeloRelatorioPia.findUnique({
            where: {
                uid,
            },
        });
        return modeloRelatorioPia;
    }
    async update(data: UpdateModeloRelatorioPiaDto, from: ModeloRelatorioPia) {
        const modeloRelatorioPia = await prisma.modeloRelatorioPia.update({
            where: {
                uid: from.uid,
            },
            data,
        });
        return modeloRelatorioPia;
    }

    async delete(uid: string) {
        await prisma.modeloRelatorioPia.delete({
            where: {
                uid,
            },
        });
    }
}