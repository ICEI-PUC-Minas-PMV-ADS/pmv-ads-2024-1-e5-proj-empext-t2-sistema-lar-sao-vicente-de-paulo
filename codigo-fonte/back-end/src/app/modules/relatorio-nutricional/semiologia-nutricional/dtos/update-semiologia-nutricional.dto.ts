import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSemiologiaNutricionalDto } from './create-semiologia-nutricional.dto';

export class UpdateSemiologiaNutricionalDto extends PartialType(
	OmitType(CreateSemiologiaNutricionalDto, ['id_ficha_nutricional']),
) {}
