import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateFichaNutricionalDto } from './create-ficha-nutricional';

export class UpdateFichaNutricionalDto extends PartialType(
	OmitType(CreateFichaNutricionalDto, ['id_idoso', 'id_usuario']),
) {}
