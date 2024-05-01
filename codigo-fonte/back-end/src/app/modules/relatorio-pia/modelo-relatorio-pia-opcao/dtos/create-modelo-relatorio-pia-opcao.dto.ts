import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateModeloRelatorioPiaOpcaoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    opcao: string;
    
    @ApiProperty()
    @IsNotEmpty()
    id_modelo_relatorio_pia_resposta: bigint;
}