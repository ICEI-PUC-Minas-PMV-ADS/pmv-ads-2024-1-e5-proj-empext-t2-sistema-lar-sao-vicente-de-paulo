import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateCargoPermissaoDto {
	@ApiProperty()
	@IsNumber()
	id_cargo: bigint;

	@ApiProperty()
	@IsNumber()
	id_permissao: bigint;

	@ApiProperty({ default: true })
	@IsBoolean()
	ativo: boolean;
}
