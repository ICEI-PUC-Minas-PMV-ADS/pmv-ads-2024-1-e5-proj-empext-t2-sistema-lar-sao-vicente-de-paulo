import { ApiProperty } from "@nestjs/swagger";
import {ModeloRelatorioPia as ModeloRelatorioPiaModel} from '@prisma/client'

export class ModeloRelatorioPia implements ModeloRelatorioPiaModel {
    @ApiProperty()
    id: bigint;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    versao: number;

    @ApiProperty()
    criado_em: Date;

    @ApiProperty()
    atualizado_em: Date;
}