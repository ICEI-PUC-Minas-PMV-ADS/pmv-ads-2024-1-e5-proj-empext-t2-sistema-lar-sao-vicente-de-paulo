import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRelatorioPiaRespostaDefinidaDto } from './create-relatorio-pia-resposta-definida.dto';

export class UpdateRelatorioPiaRespostaDefinidaDto extends PartialType(
	OmitType(CreateRelatorioPiaRespostaDefinidaDto, [
		'uid_relatorio_pia_resposta_opcao',
	]),
) {}
