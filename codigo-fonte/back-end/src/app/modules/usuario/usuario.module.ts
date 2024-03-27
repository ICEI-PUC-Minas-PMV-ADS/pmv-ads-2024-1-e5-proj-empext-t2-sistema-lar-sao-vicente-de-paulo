import { Module } from '@nestjs/common';
import { FindUidUsuarioService } from './services/find-uid-usuario.service';
import { FindUidUsuarioController } from './controllers/find-uid-usuario.controller';
import { FindAllUsuarioService } from './services/find-all-usuario.service';
import { FindAllUsuarioController } from './controllers/find-all-usuario.controller';
import { CreateUsuarioService } from './services/create-usuario.service';
import { CreateUsuarioController } from './controllers/create-usuario.controller';
import { UpdateUsuarioService } from './services/update-usuario.service';
import { UpdateUsuarioController } from './controllers/update-usuario.controller';
import { DeleteUsuarioService } from './services/delete-usuario.service';
import { DeleteUsuarioController } from './controllers/delete-usuario.controller';
import { PrismaUsuarioRepository } from '@/app/modules/usuario/repositories/prisma/prisma-usuario-repository';
import { CryptoModule } from '@/core/providers/crypto/crypto.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { DatabaseModule } from '@/core/providers/database/database.module';

@Module({
	providers: [
		CreateUsuarioService,
		FindAllUsuarioService,
		FindUidUsuarioService,
		UpdateUsuarioService,
		DeleteUsuarioService,
		PrismaUsuarioRepository,
	],
	controllers: [
		CreateUsuarioController,
		FindAllUsuarioController,
		FindUidUsuarioController,
		UpdateUsuarioController,
		DeleteUsuarioController,
	],
	imports: [DatabaseModule, CryptoModule, QueryBuilderModule],
})
export class UsuarioModule {}
