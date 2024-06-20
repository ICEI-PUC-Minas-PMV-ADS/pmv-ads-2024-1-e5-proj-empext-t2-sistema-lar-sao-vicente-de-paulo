import { Module } from '@nestjs/common';
import { CreateModeloRelatorioPiaService } from './services/create-modelo-relatorio-pia.service';
import { CreateModeloRelatorioPiaController } from './controllers/create-modelo-relatorio-pia.controller';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { PrismaModeloRelatorioPiaRepository } from './repositories/prisma/prisma-modelo-relatorio-pia.repository';
import { DeleteModeloRelatorioPiaService } from './services/delete-modelo-relatorio-pia.service';
import { DeleteModeloRelatorioPiaController } from './controllers/delete-modelo-relatorio-pia.controller';
import { UpdateModeloRelatorioPiaService } from './services/update-modelo-relatorio-pia.service';
import { UpdateModeloRelatorioPiaController } from './controllers/update-modelo-relatorio-pia.controller';
import { FindUidModeloRelatorioPiaService } from './services/find-uid-modelo-relatorio-pia.service';
import { FindUidModeloRelatorioPiaController } from './controllers/find-uid-modelo-relatorio-pia.controller';
import { FindAllModeloRelatorioPiaService } from './services/find-all-modelo-relatorio-pia.service';
import { FindAllModeloRelatorioPiaController } from './controllers/find-all-modelo-relatorio-pia.controller';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';

@Module({
	providers: [
		CreateModeloRelatorioPiaService,
		DeleteModeloRelatorioPiaService,
		UpdateModeloRelatorioPiaService,
		FindUidModeloRelatorioPiaService,
		FindAllModeloRelatorioPiaService,
		PrismaModeloRelatorioPiaRepository,
	],
	controllers: [
		CreateModeloRelatorioPiaController,
		FindUidModeloRelatorioPiaController,
		FindAllModeloRelatorioPiaController,
		UpdateModeloRelatorioPiaController,
		DeleteModeloRelatorioPiaController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class ModeloRelatorioPiaModule {}
