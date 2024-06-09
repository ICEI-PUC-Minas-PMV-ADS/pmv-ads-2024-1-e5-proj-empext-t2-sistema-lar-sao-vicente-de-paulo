import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { IdosoModule } from './modules/idoso/idoso.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { JwtModule } from '@nestjs/jwt';
import { authToken } from '@/config/auth';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { GrupoPermissaoModule } from './modules/grupo-permissao/grupo-permissao.module';
import { CargoPermissaoModule } from './modules/cargo-permissao/cargo-permissao.module';
import { PermissaoModule } from './modules/permissao/permissao.module';
import { APP_GUARD } from '@nestjs/core';
import { RedisGuard } from '@/core/guards/auth.guard';
import { RolesGuard } from '@/core/guards/role.guard';
import { ResponsavelIdosoModule } from './modules/responsavel-idoso/responsavel-idoso.module';
import { RelatorioPiaMainModule } from './modules/relatorio-pia/relatorio-pia-main.module';
import { RelatorioNutricionalMainModule } from './modules/relatorio-nutricional/relatorio-nutricional-main.module';

@Module({
	imports: [
		DatabaseModule,
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
		CargoModule,
		CargoPermissaoModule,
		GrupoPermissaoModule,
		PermissaoModule,
		ResponsavelIdosoModule,
		RelatorioPiaMainModule,
		RelatorioNutricionalMainModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RedisGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
