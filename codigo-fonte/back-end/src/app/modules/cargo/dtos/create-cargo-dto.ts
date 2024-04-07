import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateCargoPermissaoDto } from '../../cargo-permissao/dtos/create-cargo-permissao-dto';

export class CreateCargoDto {
	@ApiProperty()
	@IsString()
	nome: string;

	@ApiProperty()
	@IsArray()
	permissoes: Partial<CreateCargoPermissaoDto[]>;
}
