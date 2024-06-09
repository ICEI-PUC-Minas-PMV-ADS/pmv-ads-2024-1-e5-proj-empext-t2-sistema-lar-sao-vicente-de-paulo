import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateNecessidadeNutricionalDto } from './create-necessidade-nutricional.dto';

export class UpdateNecessidadeNutricionalDto extends PartialType(
	OmitType(CreateNecessidadeNutricionalDto, ['id_ficha_nutricional']),
) {}
