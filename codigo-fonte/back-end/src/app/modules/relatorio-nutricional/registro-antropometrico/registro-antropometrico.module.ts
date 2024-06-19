import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { Module } from '@nestjs/common';
import { CreateRegistroAntropometricoService } from './services/create-registro-antropometrico.service';
import { PrismaFichaNutricionalRepository } from '../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { PrismaRegistroAntropometricoRepository } from './repositories/prisma/prisma-registro-antropometrico.repository';
import { DeleteRegistroAntropometricoService } from './services/delete-registro-antropometrico.service';
import { FindAllRegistroAntropometricoService } from './services/find-all-registro-antropometrico.service';
import { FindUidRegistroAntropometricoService } from './services/find-uid-registro-antropometrico.service';
import { UpdateRegistroAntropometricoService } from './services/update-registro-antropometrico.service';
import { CreateRegistroAntropometricoController } from './controllers/create-registro-antropometrico.controller';
import { DeleteRegistroAntropometricoController } from './controllers/delete-registro-antropometrico.controller';
import { FindAllRegistroAntropometricoController } from './controllers/find-all-registro-antropometrico.controller';
import { FindUidRegistroAntropometricoController } from './controllers/find-uid-registro-antropometrico.controller';
import { UpdateRegistroAntropometricoController } from './controllers/update-registro-antropometrico.controller';

@Module({
	providers: [
		CreateRegistroAntropometricoService,
		DeleteRegistroAntropometricoService,
		FindAllRegistroAntropometricoService,
		FindUidRegistroAntropometricoService,
		UpdateRegistroAntropometricoService,
		PrismaRegistroAntropometricoRepository,
		PrismaFichaNutricionalRepository,
	],
	controllers: [
		CreateRegistroAntropometricoController,
		FindAllRegistroAntropometricoController,
		FindUidRegistroAntropometricoController,
		UpdateRegistroAntropometricoController,
		DeleteRegistroAntropometricoController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class RegistroAntropometricoModule {}
