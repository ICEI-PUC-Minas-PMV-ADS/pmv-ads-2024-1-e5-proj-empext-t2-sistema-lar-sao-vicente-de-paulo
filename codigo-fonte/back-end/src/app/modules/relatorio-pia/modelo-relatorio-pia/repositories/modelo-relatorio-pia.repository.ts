import { ModeloRelatorioPia } from "@prisma/client";
import { CreateModeloRelatorioPiaDto } from "../dtos/create-modelo-relatorio-pia.dto";
import { UpdateModeloRelatorioPiaDto } from "../dtos/update-modelo-relatorio-pia.dto";

export interface modeloRelatorioPiaRepository {
    create(data: CreateModeloRelatorioPiaDto): Promise<ModeloRelatorioPia>;
    findByUid(uid: string): Promise<ModeloRelatorioPia | null>;
    update(data: UpdateModeloRelatorioPiaDto, from: ModeloRelatorioPia): Promise<ModeloRelatorioPia>;
    findByNome(nome: string): Promise<ModeloRelatorioPia | null>;
    versioningUpdate(uid: string): Promise<ModeloRelatorioPia>;
    delete(uid: string): Promise<void>;
}