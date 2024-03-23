import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLogoutDto } from '../dtos/logout.dto';
import { AuthLogoutService } from '../services/logout.service';
import { Public } from '@/common/decorators/is-public.decorator';

@ApiTags('auth')
@Controller('auth/logout')
export class AuthLogoutController {
    constructor(private deleteToken: AuthLogoutService) {}

    @Post()
    @Public()
    async handle(@Body() dto: AuthLogoutDto) {
        await this.deleteToken.execute(dto.token);
    }
}
