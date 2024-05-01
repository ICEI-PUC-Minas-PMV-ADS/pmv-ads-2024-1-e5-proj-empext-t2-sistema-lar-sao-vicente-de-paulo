import { CreateModeloRelatorioPiaRespostaDto } from "../dtos/create-modelo-relatorio-pia-resposta.dto";
import { UpdateModeloRelatorioPiaRespostaDto } from "../dtos/update-modelo-relatorio-pia-resposta.dto";
import { ModeloRelatorioPiaResposta } from "../entities/modelo-relatorio-pia-resposta.entity";

export interface modeloRelatorioPiaRespostaRepository {
    create(data: CreateModeloRelatorioPiaRespostaDto): Promise<ModeloRelatorioPiaResposta>;
    findByUid(uid: string): Promise<ModeloRelatorioPiaResposta | null>;
    update(data: UpdateModeloRelatorioPiaRespostaDto, from: ModeloRelatorioPiaResposta): Promise<ModeloRelatorioPiaResposta>;
    delete(uid: string): Promise<void>;
}