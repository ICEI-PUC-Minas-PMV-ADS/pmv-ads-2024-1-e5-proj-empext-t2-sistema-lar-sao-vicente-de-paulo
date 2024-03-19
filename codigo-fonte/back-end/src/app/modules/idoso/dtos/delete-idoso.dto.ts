import { ApiProperty } from "@nestjs/swagger";
import { Situacao } from "@prisma/client";
import { IsString } from "class-validator";

export class DeleteIdosoDto {
    @IsString()
    situacao = Situacao.INATIVO

    @ApiProperty()
    @IsString()
    motivo_inativacao: string

}