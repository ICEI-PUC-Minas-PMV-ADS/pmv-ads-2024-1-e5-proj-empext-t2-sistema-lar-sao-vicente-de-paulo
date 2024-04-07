import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CargoPermissao } from '../../cargo-permissao/entities/modelo-cargo-permissao.entity';

export class CreateCargoDto {
	@ApiProperty()
	@IsString()
	nome: string;

	@ApiProperty()
	@IsArray()
	permissoes: Partial<CargoPermissao[]>;
}
