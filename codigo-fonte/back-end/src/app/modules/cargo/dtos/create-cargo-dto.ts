import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { CargoPermissao } from '../../cargo-permissao/entities/modelo-cargo-permissao.entity';
import { $Enums } from '@prisma/client';

export class CreateCargoDto {
	@ApiProperty()
	@IsString()
	nome: string;

	@ApiProperty()
	@IsArray()
	permissoes: Partial<CargoPermissao[]>;

	@ApiPropertyOptional({ description: 'Situação do usuário' })
	@IsString()
	@IsOptional()
	situacao?: $Enums.Situacao;
}
