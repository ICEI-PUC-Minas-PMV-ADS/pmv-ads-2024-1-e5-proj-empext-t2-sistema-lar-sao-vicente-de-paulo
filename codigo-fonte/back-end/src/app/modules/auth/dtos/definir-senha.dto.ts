import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDefinirSenhaDto {
    @ApiProperty()
    @IsString()
    codigo?: string;

    @ApiProperty()
    @IsString()
    senha?: string;
}
