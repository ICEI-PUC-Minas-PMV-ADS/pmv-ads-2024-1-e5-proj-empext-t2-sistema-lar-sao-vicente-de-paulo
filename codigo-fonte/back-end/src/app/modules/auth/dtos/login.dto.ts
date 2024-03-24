import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginDto {
	@ApiProperty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsString()
	senha: string;
}
