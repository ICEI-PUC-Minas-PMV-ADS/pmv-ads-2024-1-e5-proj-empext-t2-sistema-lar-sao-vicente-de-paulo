import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginService } from '../services/login.service';
import { AuthLoginDto } from '../dtos/login.dto';
import { AppResponse } from '@/common/utils/app-response';
import { Public } from '@/common/decorators/is-public.decorator';

@ApiTags('auth')
@Controller('auth/login')
export class AuthLoginController {
    constructor(private authLogin: AuthLoginService) {}

    @Post()
    @Public()
    async handle(@Body() data: AuthLoginDto): Promise<AppResponse> {
        const execute = await this.authLogin.execute(data);

        return new AppResponse(execute);
    }
}
