import { Module } from '@nestjs/common';
import { AuthLoginService } from './services/login.service';
import { AuthLoginController } from './controllers/login.controller';
import { AuthRecoverService } from './services/recover.service';
import { AuthRecoverController } from './controllers/recover.controller';
import { AuthLogoutService } from './services/logout.service';
import { AuthLogoutController } from './controllers/logout.controller';
import { AwsSesService } from '@/core/providers/mail/resend.service';
import { AuthRedefinirSenhaService } from './services/redefinir-senha.service';
import { AuthRedefinirSenhaController } from './controllers/redefinir-senha.controller';
import { AuthUpdateSenhaService } from './services/update-senha.service';
import { AuthUpdateSenhaController } from './controllers/update-senha.controller';
import { AuthDefinirSenhaController } from './controllers/definir-senha.controller';
import { AuthDefinirSenhaService } from './services/definir-senha.service';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { CryptoModule } from '@/core/providers/crypto/crypto.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';

@Module({
	providers: [
		AwsSesService,
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
	imports: [DatabaseModule, CryptoModule, QueryBuilderModule],
})
export class AuthModule {}
