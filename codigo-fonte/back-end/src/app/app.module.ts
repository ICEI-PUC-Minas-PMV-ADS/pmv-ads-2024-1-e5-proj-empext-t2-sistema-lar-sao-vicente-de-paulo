import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { IdosoModule } from './modules/idoso/idoso.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { JwtModule } from '@nestjs/jwt';
import { authToken } from '@/config/auth';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		RedisModule.forRoot({
			config: {
				host: process.env.REDIS_HOST,
				port: Number(process.env.REDIS_PORT),
				password: process.env.REDIS_PASSWORD,
			},
		}),
		JwtModule.register({
			global: true,
			secret: authToken.secret,
			signOptions: { expiresIn: '7d' },
		}),
		AuthModule,
		UsuarioModule,
		IdosoModule,
	],
	providers: [],
})
export class AppModule {}
