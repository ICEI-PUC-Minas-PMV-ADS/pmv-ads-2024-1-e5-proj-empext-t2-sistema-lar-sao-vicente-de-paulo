import { CreateModeloRelatorioPiaDto } from "./create-modelo-relatorio-pia.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateModeloRelatorioPiaDto extends PartialType(CreateModeloRelatorioPiaDto) {}