import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRelatorioPiaOpcaoDto } from './create-relatorio-pia-opcao.dto';

export class UpdateRelatorioPiaOpcaoDto extends PartialType(
	OmitType(CreateRelatorioPiaOpcaoDto, ['id_relatorio_pia_resposta']),
) {}
