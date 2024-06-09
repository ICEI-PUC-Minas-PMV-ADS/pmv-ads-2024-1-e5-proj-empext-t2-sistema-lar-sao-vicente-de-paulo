import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { Module } from '@nestjs/common';
import { CreateSemiologiaNutricionalService } from './services/create-semiologia-nutricional.service';
import { CreateSemiologiaNutricionalController } from './controllers/create-semiologia-nutricional.controller';
import { PrismaFichaNutricionalRepository } from '../ficha-nutricional/repositories/prisma/prisma-ficha-nutricional.repository';
import { PrismaSemiologiaNutricionalRepository } from './repositories/prisma/prisma-Semiologia-nutricional.repository';
import { DeleteSemiologiaNutricionalService } from './services/delete-semiologia-nutricional.service';
import { FindAllSemiologiaNutricionalService } from './services/find-all-semiologia-nutricional.service';
import { FindUidSemiologiaNutricionalService } from './services/find-uid-semiologia-nutricional.service';
import { UpdateSemiologiaNutricionalService } from './services/update-semiologia-nutricional.service';
import { DeleteSemiologiaNutricionalController } from './controllers/delete-semiologia-nutricional.controller';
import { FindAllSemiologiaNutricionalController } from './controllers/find-all-semiologia-nutricional.controller';
import { FindUidSemiologiaNutricionalController } from './controllers/find-uid-semiologia-nutricional.controller';
import { UpdateSemiologiaNutricionalController } from './controllers/update-semiologia-nutricional.controller';

@Module({
	providers: [
		CreateSemiologiaNutricionalService,
		DeleteSemiologiaNutricionalService,
		FindAllSemiologiaNutricionalService,
		FindUidSemiologiaNutricionalService,
		UpdateSemiologiaNutricionalService,
		PrismaSemiologiaNutricionalRepository,
		PrismaFichaNutricionalRepository,
	],
	controllers: [
		CreateSemiologiaNutricionalController,
		FindAllSemiologiaNutricionalController,
		FindUidSemiologiaNutricionalController,
		UpdateSemiologiaNutricionalController,
		DeleteSemiologiaNutricionalController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class SemiologiaNutricionalModule {}
