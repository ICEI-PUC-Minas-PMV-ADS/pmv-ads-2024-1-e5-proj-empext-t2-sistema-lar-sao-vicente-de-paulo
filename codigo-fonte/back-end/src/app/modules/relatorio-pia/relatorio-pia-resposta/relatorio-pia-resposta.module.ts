import { DatabaseModule } from '@/core/providers/database/database.module';
import { Module } from '@nestjs/common';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { CreateRelatorioPiaRespostaController } from './controllers/create-relatorio-pia-resposta.controller';
import { DeleteRelatorioPiaRespostaController } from './controllers/delete-relatorio-pia-resposta.controller';
import { FindAllRelatorioPiaRespostaController } from './controllers/find-all-relatorio-pia-resposta.controller';
import { FindUidRelatorioPiaRespostaController } from './controllers/find-uid-relatorio-pia-resposta.controller';
import { UpdateRelatorioPiaRespostaController } from './controllers/update-relatorio-pia-resposta.controller';
import { PrismaRelatorioPiaRespostaRepository } from './repositories/prisma/prisma-relatorio-pia-resposta.repository';
import { CreateRelatorioPiaRespostaService } from './services/create-relatorio-pia-resposta.service';
import { DeleteRelatorioPiaRespostaService } from './services/delete-relatorio-pia-resposta.service';
import { FindAllRelatorioPiaRespostaService } from './services/find-all-relatorio-pia-resposta.service';
import { FindUidRelatorioPiaRespostaService } from './services/find-uid-relatorio-pia-resposta.service';
import { UpdateRelatorioPiaRespostaService } from './services/update-relatorio-pia-resposta.service';
import { PrismaRelatorioPiaPerguntaRepository } from '../relatorio-pia-pergunta/repositories/prisma/prisma-relatorio-pia-pergunta.repository';

@Module({
	providers: [
		CreateRelatorioPiaRespostaService,
		FindAllRelatorioPiaRespostaService,
		FindUidRelatorioPiaRespostaService,
		UpdateRelatorioPiaRespostaService,
		DeleteRelatorioPiaRespostaService,
		PrismaRelatorioPiaRespostaRepository,
		PrismaRelatorioPiaPerguntaRepository,
	],
	controllers: [
		CreateRelatorioPiaRespostaController,
		FindAllRelatorioPiaRespostaController,
		FindUidRelatorioPiaRespostaController,
		UpdateRelatorioPiaRespostaController,
		DeleteRelatorioPiaRespostaController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class RelatorioPiaRespostaModule {}
