import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ModeloRelatorioPiaResposta as ModeloRelatorioPiaRespostaModel} from '@prisma/client'

export class ModeloRelatorioPiaResposta implements ModeloRelatorioPiaRespostaModel {
    @ApiProperty()
    id: bigint;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    titulo: string;

    @ApiProperty()
    tipo: $Enums.tiposReposta;

    @ApiProperty()
    criado_em: Date;

    @ApiProperty()
    atualizado_em: Date;

    @ApiProperty()
    id_modelo_relatorio_pia_pergunta: bigint;
}