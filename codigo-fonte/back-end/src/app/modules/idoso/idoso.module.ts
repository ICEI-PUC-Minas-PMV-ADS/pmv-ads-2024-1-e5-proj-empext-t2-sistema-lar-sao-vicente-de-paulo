import { Module } from '@nestjs/common';
import { CreateIdosoService } from './services/create-idoso.service';
import { CreateIdosoController } from './controllers/create-idoso.controller';
import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository';
import { PrismaIdosoRepository } from '@/repositories/prisma/prisma-idoso-repository';
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

@Module({
	providers: [
		CreateIdosoService,
		FindAllIdososService,
		FindUidIdosoService,
		UpdateIdosoService,
		DeleteIdosoService,
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
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class IdosoModule {}
