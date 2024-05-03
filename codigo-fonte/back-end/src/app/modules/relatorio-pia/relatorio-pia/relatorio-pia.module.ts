import { DatabaseModule } from '@/core/providers/database/database.module';
import { Module } from '@nestjs/common';
import { CreateRelatorioPiaService } from './services/create-relatorio-pia.service';
import { CreateRelatorioPiaController } from './controllers/create-relatorio-pia.controller';
import { PrismaRelatorioPiaRepository } from './repositories/prisma/prisma-relatorio-pia.repository';
import { DeleteRelatorioPiaService } from './services/delete-relatorio-pia.service';
import { FindUidRelatorioPiaService } from './services/find-uid-relatorio-pia.service';
import { UpdateRelatorioPiaService } from './services/update-relatorio-pia.service';
import { FindUidRelatorioPiaController } from './controllers/find-uid-relatorio-pia.controller';
import { DeleteRelatorioPiaController } from './controllers/delete-relatorio-pia.controller';
import { UpdateRelatorioPiaController } from './controllers/update-relatorio-pia.controller';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { FindAllRelatorioPiaService } from './services/find-all-relatorio-pia.service';
import { FindAllRelatorioPiaController } from './controllers/find-all-relatorio-pia.controller';
import { PrismaModeloRelatorioPiaRepository } from '../modelo-relatorio-pia/repositories/prisma/prisma-modelo-relatorio-pia.repository';
import { PrismaUsuarioRepository } from '../../usuario/repositories/prisma/prisma-usuario-repository';
import { PrismaIdosoRepository } from '../../idoso/repositories/prisma/prisma-idoso-repository';

@Module({
	providers: [
		CreateRelatorioPiaService,
		FindAllRelatorioPiaService,
		FindUidRelatorioPiaService,
		UpdateRelatorioPiaService,
		DeleteRelatorioPiaService,
		PrismaRelatorioPiaRepository,
		PrismaModeloRelatorioPiaRepository,
		PrismaUsuarioRepository,
		PrismaIdosoRepository,
	],
	controllers: [
		CreateRelatorioPiaController,
		FindAllRelatorioPiaController,
		FindUidRelatorioPiaController,
		UpdateRelatorioPiaController,
		DeleteRelatorioPiaController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class RelatorioPiaModule {}
