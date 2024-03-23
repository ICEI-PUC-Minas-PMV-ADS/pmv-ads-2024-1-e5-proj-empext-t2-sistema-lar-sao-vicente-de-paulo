import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class AuthLoginDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    senha: string;

    @ApiProperty()
    @IsUUID()
    uid_empresa: string;
}
