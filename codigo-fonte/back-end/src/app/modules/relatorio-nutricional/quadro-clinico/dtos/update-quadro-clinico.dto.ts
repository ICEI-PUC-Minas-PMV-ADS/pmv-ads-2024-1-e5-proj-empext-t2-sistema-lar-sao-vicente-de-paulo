import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateQuadroClinicoDto } from './create-quadro-clinico.dto';

export class UpdateQuadroClinicoDto extends PartialType(
	OmitType(CreateQuadroClinicoDto, ['id_ficha_nutricional']),
) {}
