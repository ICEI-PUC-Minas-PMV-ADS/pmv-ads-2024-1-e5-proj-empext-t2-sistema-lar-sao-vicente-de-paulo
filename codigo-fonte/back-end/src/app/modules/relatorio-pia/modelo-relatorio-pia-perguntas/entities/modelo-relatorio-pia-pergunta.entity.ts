import { ApiProperty } from "@nestjs/swagger";
import { ModeloRelatorioPiaPergunta as ModeloRelatorioPiaPerguntaModel} from "@prisma/client";

export class ModeloRelatorioPiaPergunta implements ModeloRelatorioPiaPerguntaModel {
    @ApiProperty()
    id: bigint;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    pergunta: string;

    @ApiProperty()
    criado_em: Date;

    @ApiProperty()
    atualizado_em: Date;

    @ApiProperty()
    id_modelo_relatorio_pia: bigint;
}
