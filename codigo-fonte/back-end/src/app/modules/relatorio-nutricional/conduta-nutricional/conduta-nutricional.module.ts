import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { Module } from '@nestjs/common';
import { CreateCondutaNutricionalService } from './services/create-conduta-nutricional.service';
import { CreateCondutaNutricionalController } from './controllers/create-conduta-nutricional.controller';
import { PrismaFichaNutricionalRepository } from '../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { PrismaCondutaNutricionalRepository } from './repositories/prisma/prisma-conduta-nutricional.repository';
import { DeleteCondutaNutricionalService } from './services/delete-conduta-nutricional.service';
import { FindAllCondutaNutricionalService } from './services/find-all-conduta-nutricional.service';
import { FindUidCondutaNutricionalService } from './services/find-uid-conduta-nutricional.service';
import { UpdateCondutaNutricionalService } from './services/update-conduta-nutricional.service';
import { DeleteCondutaNutricionalController } from './controllers/delete-conduta-nutricional.controller';
import { FindAllCondutaNutricionalController } from './controllers/find-all-conduta-nutricional.controller';
import { FindUidCondutaNutricionalController } from './controllers/find-uid-conduta-nutricional.controller';
import { UpdateCondutaNutricionalController } from './controllers/update-conduta-nutricional.controller';

@Module({
	providers: [
		CreateCondutaNutricionalService,
		DeleteCondutaNutricionalService,
		FindAllCondutaNutricionalService,
		FindUidCondutaNutricionalService,
		UpdateCondutaNutricionalService,
		PrismaCondutaNutricionalRepository,
		PrismaFichaNutricionalRepository,
	],
	controllers: [
		CreateCondutaNutricionalController,
		FindAllCondutaNutricionalController,
		FindUidCondutaNutricionalController,
		UpdateCondutaNutricionalController,
		DeleteCondutaNutricionalController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class CondutaNutricionalModule {}
