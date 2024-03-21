import { ApiProperty } from "@nestjs/swagger";
import { Situacao } from "@prisma/client";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class DeleteIdosoDto {
    @IsString()
    situacao = Situacao.INATIVO

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    motivo_inativacao: string

}