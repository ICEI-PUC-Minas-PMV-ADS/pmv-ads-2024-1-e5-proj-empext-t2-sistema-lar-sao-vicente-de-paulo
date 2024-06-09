import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCondutaNutricionalDto } from './create-conduta-nutricional.dto';

export class UpdateCondutaNutricionalDto extends PartialType(
	OmitType(CreateCondutaNutricionalDto, ['id_ficha_nutricional']),
) {}
