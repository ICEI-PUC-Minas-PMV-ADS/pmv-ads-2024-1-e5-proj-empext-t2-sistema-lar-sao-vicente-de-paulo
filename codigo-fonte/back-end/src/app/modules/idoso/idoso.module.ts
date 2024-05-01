import { Module } from '@nestjs/common';
import { CreateIdosoService } from './services/create-idoso.service';
import { CreateIdosoController } from './controllers/create-idoso.controller';
import { PrismaUsuarioRepository } from '@/app/modules/usuario/repositories/prisma/prisma-usuario-repository';
import { FindAllIdososService } from './services/find-all-idoso.service';
import { FindAllIdosoController } from './controllers/find-all-idoso.controller';
import { FindUidIdosoController } from './controllers/find-uid-idoso.controller';
import { FindUidIdosoService } from './services/find-uid-idoso.service';
import { DeleteIdosoService } from './services/delete-idoso.service';
import { DeleteIdosoController } from './controllers/delete-idoso.controller';
import { UpdateIdosoService } from './services/update-idoso.service';
import { UpdateIdosoController } from './controllers/update-idoso.controller';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { QueryBuilderService } from '@/core/providers/query-builder/query-builder.service';
import { PrismaIdosoRepository } from './repositories/prisma/prisma-idoso-repository';
import { UploadModule } from '@/core/providers/upload/upload.module';
import { UploadFotoIdosoController } from './controllers/upload-foto-idoso.controller';
import { UploadFotoIdosoService } from './services/upload-foto-idoso.service';

@Module({
	providers: [
		CreateIdosoService,
		FindAllIdososService,
		FindUidIdosoService,
		UpdateIdosoService,
		DeleteIdosoService,
		UploadFotoIdosoService,
		PrismaIdosoRepository,
		PrismaUsuarioRepository,
		QueryBuilderService,
	],
	controllers: [
		CreateIdosoController,
		FindAllIdosoController,
		FindUidIdosoController,
		UpdateIdosoController,
		DeleteIdosoController,
		UploadFotoIdosoController,
	],
	imports: [DatabaseModule, QueryBuilderModule, UploadModule],
})
export class IdosoModule {}
