import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRelatorioPiaRespostaDto } from './create-relatorio-pia-resposta.dto';

export class UpdateRelatorioPiaRespostaDto extends PartialType(
	OmitType(CreateRelatorioPiaRespostaDto, ['id_relatorio_pia_pergunta']),
) {}
