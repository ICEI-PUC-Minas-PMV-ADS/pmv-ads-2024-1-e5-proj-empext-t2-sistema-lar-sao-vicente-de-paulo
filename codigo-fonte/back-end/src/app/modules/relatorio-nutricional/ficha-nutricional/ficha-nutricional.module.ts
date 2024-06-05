import { Module } from '@nestjs/common';
import { CreateFichaNutricionalService } from './services/create-ficha-nutricional.service';
import { CreateFichaNutricionalController } from './controllers/create-ficha-nutricional.controller';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { PrismaIdosoRepository } from '../../idoso/repositories/prisma/prisma-idoso-repository';
import { PrismaUsuarioRepository } from '../../usuario/repositories/prisma/prisma-usuario-repository';
import { PrismaFichaNutricionalRepository } from './repositories/prisma/prisma-ficha-nutricional.repository';
import { DeleteFichaNutricionalService } from './services/delete-ficha-nutricional.service';
import { FindAllFichaNutricionalService } from './services/find-all-ficha-nutricional.service';
import { FindUidFichaNutricionalService } from './services/find-uid-ficha-nutricional.service';
import { UpdateFichaNutricionalService } from './services/update-ficha-nutricional.service';
import { DeleteFichaNutricionalController } from './controllers/delete-ficha-nutricional.controller';
import { FindAllFichaNutricionalController } from './controllers/find-all-ficha-nutricional.controller';
import { FindUidFichaNutricionalController } from './controllers/find-uid-ficha-nutricional.controller';
import { UpdateFichaNutricionalController } from './controllers/update-ficha-nutricional.controller';

@Module({
	providers: [
		CreateFichaNutricionalService,
		DeleteFichaNutricionalService,
		FindAllFichaNutricionalService,
		FindUidFichaNutricionalService,
		UpdateFichaNutricionalService,
		PrismaFichaNutricionalRepository,
		PrismaIdosoRepository,
		PrismaUsuarioRepository,
	],
	controllers: [
		CreateFichaNutricionalController,
		FindAllFichaNutricionalController,
		FindUidFichaNutricionalController,
		UpdateFichaNutricionalController,
		DeleteFichaNutricionalController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class FichaNutricionalModule {}
