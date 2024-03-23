import { Module } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { AuthLoginService } from './services/login.service';
import { AuthLoginController } from './controllers/login.controller';
import { AuthRecoverService } from './services/recover.service';
import { AuthRecoverController } from './controllers/recover.controller';
import { AuthLogoutService } from './services/logout.service';
import { AuthLogoutController } from './controllers/logout.controller';
import { AwsSesService } from '@/core/providers/mail/aws-ses.service';
import { BcryptService } from '@/core/providers/bcrypt/bcrypt.service';
import { AuthRedefinirSenhaService } from './services/redefinir-senha.service';
import { AuthRedefinirSenhaController } from './controllers/redefinir-senha.controller';
import { AuthUpdateSenhaService } from './services/update-senha.service';
import { AuthUpdateSenhaController } from './controllers/update-senha.controller';
import { AuthDefinirSenhaController } from './controllers/definir-senha.controller';
import { AuthDefinirSenhaService } from './services/definir-senha.service';

@Module({
	providers: [
		PrismaService,
		AwsSesService,
		BcryptService,
		AuthLoginService,
		AuthRecoverService,
		AuthLogoutService,
		AuthRedefinirSenhaService,
		AuthUpdateSenhaService,
		AuthDefinirSenhaService,
	],
	controllers: [
		AuthLoginController,
		AuthRecoverController,
		AuthLogoutController,
		AuthRedefinirSenhaController,
		AuthUpdateSenhaController,
		AuthDefinirSenhaController,
	],
})
export class AuthModule {}
