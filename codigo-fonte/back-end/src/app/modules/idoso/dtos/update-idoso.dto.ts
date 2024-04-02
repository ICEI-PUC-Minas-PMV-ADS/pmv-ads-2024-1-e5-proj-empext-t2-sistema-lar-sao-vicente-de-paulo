import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateIdosoDto } from './create-idoso.dto';

export class UpdateIdosoDto extends PartialType(
	OmitType(CreateIdosoDto, ['id_usuario']),
) {}
