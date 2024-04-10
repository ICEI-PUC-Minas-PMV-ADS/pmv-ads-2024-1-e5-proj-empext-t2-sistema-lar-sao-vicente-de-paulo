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
import { UploadModule } from '@/core/providers/upload/upload.module';
import { UploadFotoUsuarioController } from './controllers/upload-foto-usuario.controller';
import { UploadFotoUsuarioService } from './services/upload-foto-usuario.service';

@Module({
	providers: [
		CreateUsuarioService,
		FindAllUsuarioService,
		FindUidUsuarioService,
		UpdateUsuarioService,
		DeleteUsuarioService,
		UploadFotoUsuarioService,
		PrismaUsuarioRepository,
	],
	controllers: [
		CreateUsuarioController,
		FindAllUsuarioController,
		FindUidUsuarioController,
		UpdateUsuarioController,
		DeleteUsuarioController,
		UploadFotoUsuarioController,
	],
	imports: [DatabaseModule, CryptoModule, QueryBuilderModule, UploadModule],
})
export class UsuarioModule {}
