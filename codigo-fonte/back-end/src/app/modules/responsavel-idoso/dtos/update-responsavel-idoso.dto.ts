import { PartialType } from '@nestjs/swagger';
import { CreateResponsavelIdosoDto } from './create-responsavel-idoso.dto';

export class UpdateResponsavelIdosoDto extends PartialType(
	CreateResponsavelIdosoDto,
) {}
