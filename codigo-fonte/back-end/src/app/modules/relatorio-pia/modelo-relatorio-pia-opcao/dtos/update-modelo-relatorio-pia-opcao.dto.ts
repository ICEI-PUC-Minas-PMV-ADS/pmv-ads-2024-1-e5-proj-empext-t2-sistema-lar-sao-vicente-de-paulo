import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateModeloRelatorioPiaOpcaoDto } from "./create-modelo-relatorio-pia-opcao.dto";

export class UpdateModeloRelatorioPiaOpcaoDto extends PartialType(
    OmitType(CreateModeloRelatorioPiaOpcaoDto, ['id_modelo_relatorio_pia_resposta']),
) {}