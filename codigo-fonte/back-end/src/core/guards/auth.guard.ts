import { IAuthUser } from '@/common/decorators/auth.decorator';
import { AppError } from '@/common/utils/app-error';
import { CONTEXT_USER_KEY } from '@/config/context-user-key';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';
import { Observable } from 'rxjs';

@Injectable()
export class RedisGuard implements CanActivate {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<
        boolean | any | Promise<boolean | any> | Observable<boolean | any>
    > {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );

        if (isPublic) return true;

        const contextArgs = context.getArgs()[0];
        const bearerToken: string = contextArgs.headers['authorization'];

        if (!bearerToken) throw new AppError('Token inválido', 403);

        const partsToken = bearerToken.split(' ');

        // valida se token e bearer existem
        if (partsToken.length !== 2) throw new AppError('Token inválido', 403);

        const [scheme, token] = partsToken;

        if (!/^Bearer$/i.test(scheme))
            throw new AppError('Token inválido', 403);

        if (token) {
            const user: IAuthUser = JSON.parse(await this.redis.get(token));

            if (!user) throw new AppError('Usuário não autenticado', 401);

            contextArgs[CONTEXT_USER_KEY] = user;

            return true;
        }

        throw new AppError('Token inválido', 403);
    }
}
