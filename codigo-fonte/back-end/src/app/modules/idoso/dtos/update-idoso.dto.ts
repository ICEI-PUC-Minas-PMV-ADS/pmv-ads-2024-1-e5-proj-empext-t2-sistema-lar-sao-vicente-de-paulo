import { PartialType } from '@nestjs/swagger';
import { CreateIdosoDto } from './create-idoso.dto';

export class UpdateIdosoDto extends PartialType(CreateIdosoDto) {}
