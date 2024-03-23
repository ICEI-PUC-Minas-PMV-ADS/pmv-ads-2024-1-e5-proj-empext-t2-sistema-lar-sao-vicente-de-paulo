import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthUpdateSenhaDto {
    @ApiProperty()
    @IsString()
    senha_atual: string;

    @ApiProperty()
    @IsString()
    senha_nova: string;
}
