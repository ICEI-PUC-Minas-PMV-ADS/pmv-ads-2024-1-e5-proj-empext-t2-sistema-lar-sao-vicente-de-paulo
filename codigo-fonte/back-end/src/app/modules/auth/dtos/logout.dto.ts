import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class AuthLogoutDto {
    @ApiProperty()
    @IsJWT()
    token: string;
}
