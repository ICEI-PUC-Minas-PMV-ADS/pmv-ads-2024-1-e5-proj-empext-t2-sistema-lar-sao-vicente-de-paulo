import { PartialType } from '@nestjs/swagger';
import { CreateCargoPermissaoDto } from './create-cargo-permissao-dto';

export class UpdateCargoPermissaoDto extends PartialType(
	CreateCargoPermissaoDto,
) {}
