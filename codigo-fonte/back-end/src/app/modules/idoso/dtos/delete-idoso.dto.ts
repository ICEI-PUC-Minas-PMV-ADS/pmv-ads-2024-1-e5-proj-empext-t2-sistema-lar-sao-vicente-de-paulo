import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteIdosoDto {
    @IsString()
    situacao = "INATIVO"

    @ApiProperty()
    @IsString()
    motivo_inativacao: string

}