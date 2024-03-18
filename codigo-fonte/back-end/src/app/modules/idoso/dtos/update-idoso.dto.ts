import { OmitType } from '@nestjs/swagger';
import { CreateIdosoDto } from './create-idoso.dto';

export class UpdateIdosoDto extends OmitType(CreateIdosoDto, ['usuario_id']) { }
