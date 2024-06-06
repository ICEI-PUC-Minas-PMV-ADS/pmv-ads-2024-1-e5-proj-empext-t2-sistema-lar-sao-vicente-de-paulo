import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { Module } from '@nestjs/common';
import { PrismaFichaNutricionalRepository } from '../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { CreateAntropometriaController } from './controllers/create-antropometria.controller';
import { DeleteAntropometriaController } from './controllers/delete-antropometria.controller';
import { FindAllAntropometriaController } from './controllers/find-all-antropometria.controller';
import { FindUidAntropometriaController } from './controllers/find-uid-antropometria.controller';
import { UpdateAntropometriaController } from './controllers/update-antropometria.controller';
import { PrismaAntropometriaRepository } from './repositories/prisma/prisma-antropometria.repository';
import { CreateAntropometriaService } from './services/create-antropometria.service';
import { DeleteAntropometriaService } from './services/delete-antropometria.service';
import { FindAllAntropometriaService } from './services/find-all-antropometria.service';
import { FindUidAntropometriaService } from './services/find-uid-antropometria.service';
import { UpdateAntropometriaService } from './services/update-antropometria.service';

@Module({
	providers: [
		CreateAntropometriaService,
		DeleteAntropometriaService,
		FindAllAntropometriaService,
		FindUidAntropometriaService,
		UpdateAntropometriaService,
		PrismaAntropometriaRepository,
		PrismaFichaNutricionalRepository,
	],
	controllers: [
		CreateAntropometriaController,
		FindAllAntropometriaController,
		FindUidAntropometriaController,
		UpdateAntropometriaController,
		DeleteAntropometriaController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class AntropometriaModule {}
