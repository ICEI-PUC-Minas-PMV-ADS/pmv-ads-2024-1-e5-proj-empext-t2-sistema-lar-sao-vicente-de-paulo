import { CreateModeloRelatorioPiaPerguntaDto } from "../dtos/create-modelo-relatorio-pia-pergunta.dto";
import { UpdateModeloRelatorioPiaPerguntaDto } from "../dtos/update-modelo-relatorio-pia-pergunta.dto";
import { ModeloRelatorioPiaPergunta } from "../entities/modelo-relatorio-pia-pergunta.entity";

export interface modeloRelatorioPiaPerguntaRepository {
    create(data: CreateModeloRelatorioPiaPerguntaDto): Promise<ModeloRelatorioPiaPergunta>;
    findByUid(uid: string): Promise<ModeloRelatorioPiaPergunta | null>;
    update(data: UpdateModeloRelatorioPiaPerguntaDto, from: ModeloRelatorioPiaPergunta): Promise<ModeloRelatorioPiaPergunta>;
    findByPergunta(pergunta: string): Promise<ModeloRelatorioPiaPergunta | null>;
    delete(uid: string): Promise<void>;
}