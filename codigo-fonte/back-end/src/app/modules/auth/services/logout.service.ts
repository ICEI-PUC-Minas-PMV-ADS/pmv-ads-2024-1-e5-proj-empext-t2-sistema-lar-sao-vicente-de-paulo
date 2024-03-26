import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AuthLogoutService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async execute(token: string) {
        await this.redis.del(token);
    }
}
