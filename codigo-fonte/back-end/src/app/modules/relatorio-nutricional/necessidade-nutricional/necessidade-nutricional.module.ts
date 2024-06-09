import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { Module } from '@nestjs/common';
import { PrismaFichaNutricionalRepository } from '../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { CreateNecessidadeNutricionalController } from './controllers/create-necessidade-nutricional.controller';
import { DeleteNecessidadeNutricionalController } from './controllers/delete-necessidade-nutricional.controller';
import { FindAllNecessidadeNutricionalController } from './controllers/find-all-necessidade-nutricional.controller';
import { FindUidNecessidadeNutricionalController } from './controllers/find-uid-necessidade-nutricional.controller';
import { UpdateNecessidadeNutricionalController } from './controllers/update-necessidade-nutricional.controller';
import { PrismaNecessidadeNutricionalRepository } from './repositories/prisma/prisma-necessidade-nutricional.repository';
import { CreateNecessidadeNutricionalService } from './services/create-necessidade-nutricional.service';
import { DeleteNecessidadeNutricionalService } from './services/delete-necessidade-nutricional.service';
import { FindAllNecessidadeNutricionalService } from './services/find-all-necessidade-nutricional.service';
import { FindUidNecessidadeNutricionalService } from './services/find-uid-necessidade-nutricional.service';
import { UpdateNecessidadeNutricionalService } from './services/update-necessidade-nutricional.service';

@Module({
	providers: [
		CreateNecessidadeNutricionalService,
		DeleteNecessidadeNutricionalService,
		FindAllNecessidadeNutricionalService,
		FindUidNecessidadeNutricionalService,
		UpdateNecessidadeNutricionalService,
		PrismaNecessidadeNutricionalRepository,
		PrismaFichaNutricionalRepository,
	],
	controllers: [
		CreateNecessidadeNutricionalController,
		FindAllNecessidadeNutricionalController,
		FindUidNecessidadeNutricionalController,
		UpdateNecessidadeNutricionalController,
		DeleteNecessidadeNutricionalController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class NecessidadeNutricionalModule {}
