import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class AuthRecoverDto {
    @ApiProperty()
    @IsJWT()
    token: string;
}
