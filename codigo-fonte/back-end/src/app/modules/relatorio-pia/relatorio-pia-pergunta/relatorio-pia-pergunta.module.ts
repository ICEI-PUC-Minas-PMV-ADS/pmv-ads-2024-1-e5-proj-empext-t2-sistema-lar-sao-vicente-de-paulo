import { DatabaseModule } from '@/core/providers/database/database.module';
import { Module } from '@nestjs/common';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { CreateRelatorioPiaPerguntaController } from './controllers/create-relatorio-pia-pergunta.controller';
import { DeleteRelatorioPiaPerguntaController } from './controllers/delete-relatorio-pia-pergunta.controller';
import { FindAllRelatorioPiaPerguntaController } from './controllers/find-all-relatorio-pia-pergunta.controller';
import { FindUidRelatorioPiaPerguntaController } from './controllers/find-uid-relatorio-pia-pergunta.controller';
import { UpdateRelatorioPiaPerguntaController } from './controllers/update-relatorio-pia-pergunta.controller';
import { PrismaRelatórioPiaPerguntaRepository } from './repositories/prisma/prisma-relatorio-pia-pergunta.repository';
import { CreateRelatorioPiaPerguntaService } from './services/create-relatorio-pia-pergunta.service';
import { DeleteRelatorioPiaPerguntaService } from './services/delete-relatorio-pia-pergunta.service';
import { FindAllRelatorioPiaPerguntaService } from './services/find-all-relatorio-pia-pergunta.service';
import { FindUidRelatorioPiaPerguntaService } from './services/find-uid-relatorio-pia-pergunta.service';
import { UpdateRelatorioPiaPerguntaService } from './services/update-relatorio-pia-pergunta.service';

@Module({
	providers: [
		CreateRelatorioPiaPerguntaService,
		FindAllRelatorioPiaPerguntaService,
		FindUidRelatorioPiaPerguntaService,
		UpdateRelatorioPiaPerguntaService,
		DeleteRelatorioPiaPerguntaService,
		PrismaRelatórioPiaPerguntaRepository,
	],
	controllers: [
		CreateRelatorioPiaPerguntaController,
		FindAllRelatorioPiaPerguntaController,
		FindUidRelatorioPiaPerguntaController,
		UpdateRelatorioPiaPerguntaController,
		DeleteRelatorioPiaPerguntaController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class RelatorioPiaPerguntaModule {}
