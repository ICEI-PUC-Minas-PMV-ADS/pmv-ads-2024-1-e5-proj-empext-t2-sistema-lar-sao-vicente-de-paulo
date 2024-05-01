import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateModeloRelatorioPiaRespostaDto } from "./create-modelo-relatorio-pia-resposta.dto";

export class UpdateModeloRelatorioPiaRespostaDto extends PartialType(
    OmitType(CreateModeloRelatorioPiaRespostaDto, ['id_modelo_relatorio_pia_pergunta']),
) {}