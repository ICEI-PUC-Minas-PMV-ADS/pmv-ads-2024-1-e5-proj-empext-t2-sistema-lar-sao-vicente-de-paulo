import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { Module } from '@nestjs/common';
import { CreateQuadroClinicoService } from './services/create-quadro-clinico.service';
import { CreateQuadroClinicoController } from './controllers/create-conduta-nutricional.controller';
import { PrismaFichaNutricionalRepository } from '../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { PrismaQuadroClinicoRepository } from './repositories/prisma/prisma-quadro-clinico.repository';
import { DeleteQuadroClinicoService } from './services/delete-quadro-clinico.service';
import { FindAllQuadroClinicoService } from './services/find-all-quadro-clinico.service';
import { FindUidQuadroClinicoService } from './services/find-uid-quadro-clinico.service';
import { UpdateQuadroClinicoService } from './services/update-quadro-clinico.service';
import { DeleteQuadroClinicoController } from './controllers/delete-conduta-nutricional.controller';
import { FindAllQuadroClinicoController } from './controllers/find-all-conduta-nutricional.controller';
import { FindUidQuadroClinicoController } from './controllers/find-uid-conduta-nutricional.controller';
import { UpdateQuadroClinicoController } from './controllers/update-conduta-nutricional.controller';

@Module({
	providers: [
		CreateQuadroClinicoService,
		DeleteQuadroClinicoService,
		FindAllQuadroClinicoService,
		FindUidQuadroClinicoService,
		UpdateQuadroClinicoService,
		PrismaQuadroClinicoRepository,
		PrismaFichaNutricionalRepository,
	],
	controllers: [
		CreateQuadroClinicoController,
		FindAllQuadroClinicoController,
		FindUidQuadroClinicoController,
		UpdateQuadroClinicoController,
		DeleteQuadroClinicoController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class QuadroClinicoModule {}
