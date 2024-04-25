import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateModeloRelatorioPiaPerguntaDto {
    @ApiProperty()
    @IsNotEmpty()
	@IsString()
    @MaxLength(255)
    pergunta: string;

    @ApiProperty()
    @IsNotEmpty()
    id_modelo_relatorio_pia: bigint;
}