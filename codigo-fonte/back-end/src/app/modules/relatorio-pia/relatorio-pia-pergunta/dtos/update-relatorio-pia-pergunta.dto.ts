import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRelatorioPiaPerguntaDto } from './create-relatorio-pia-pergunta.dto';

export class UpdateRelatorioPiaPerguntaDto extends PartialType(
	OmitType(CreateRelatorioPiaPerguntaDto, ['id_relatorio_pia']),
) {}
