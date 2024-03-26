import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { Public } from '@/common/decorators/is-public.decorator';
import { AuthRecoverDto } from '../dtos/recover.dto';
import { AuthRecoverService } from '../services/recover.service';

@ApiTags('auth')
@Controller('auth/recover')
export class AuthRecoverController {
    constructor(private recover: AuthRecoverService) {}

    @Get()
    @Public()
    async handle(@Query() data: AuthRecoverDto) {
        const recoverTokenService = await this.recover.execute(data.token);

        return new AppResponse(recoverTokenService);
    }
}
