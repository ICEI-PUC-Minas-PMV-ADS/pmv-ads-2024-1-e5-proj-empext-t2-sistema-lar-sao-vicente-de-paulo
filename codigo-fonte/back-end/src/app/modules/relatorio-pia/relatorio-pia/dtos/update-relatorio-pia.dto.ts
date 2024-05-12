import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRelatorioPiaDto } from './create-relatorio-pia.dto';

export class UpdateRelatorioPiaDto extends PartialType(
	OmitType(CreateRelatorioPiaDto, [
		'id_modelo_relatorio_pia',
		'id_usuario',
		'id_idoso',
	]),
) {}
