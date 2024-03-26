import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { AppError } from '@/common/utils/app-error';
import { IAuthUser } from '@/common/decorators/auth.decorator';

@Injectable()
export class AuthRecoverService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async execute(token: string) {
        const tokenRedis = await this.redis.get(token);

        if (!tokenRedis) throw new AppError('Token não encontrado', 401);

        return JSON.parse(tokenRedis) as IAuthUser;
    }
}
