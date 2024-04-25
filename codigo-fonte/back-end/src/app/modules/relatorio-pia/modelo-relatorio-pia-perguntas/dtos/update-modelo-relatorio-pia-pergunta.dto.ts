import { CreateModeloRelatorioPiaPerguntaDto } from "./create-modelo-relatorio-pia-pergunta.dto";
import { OmitType, PartialType } from "@nestjs/swagger";

export class UpdateModeloRelatorioPiaPerguntaDto extends PartialType(
    OmitType(CreateModeloRelatorioPiaPerguntaDto, ['id_modelo_relatorio_pia']),
) {}