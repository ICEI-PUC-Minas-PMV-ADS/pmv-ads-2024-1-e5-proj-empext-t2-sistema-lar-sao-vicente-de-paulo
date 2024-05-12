import { DatabaseModule } from '@/core/providers/database/database.module';
import { Module } from '@nestjs/common';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { CreateRelatorioPiaOpcaoController } from './controllers/create-relatorio-pia-opcao.controller';
import { DeleteRelatorioPiaOpcaoController } from './controllers/delete-relatorio-pia-opcao.controller';
import { FindAllRelatorioPiaOpcaoController } from './controllers/find-all-relatorio-pia-opcao.controller';
import { FindUidRelatorioPiaOpcaoController } from './controllers/find-uid-relatorio-pia-opcao.controller';
import { UpdateRelatorioPiaOpcaoController } from './controllers/update-relatorio-pia-opcao.controller';
import { PrismaRelatorioPiaOpcaoRepository } from './repositories/prisma/prisma-relatorio-pia-opcao.repository';
import { CreateRelatorioPiaOpcaoService } from './services/create-relatorio-pia-opcao.service';
import { DeleteRelatorioPiaOpcaoService } from './services/delete-relatorio-pia-opcao.service';
import { FindAllRelatorioPiaOpcaoService } from './services/find-all-relatorio-pia-opcao.service';
import { FindUidRelatorioPiaOpcaoService } from './services/find-uid-relatorio-pia-opcao.service';
import { UpdateRelatorioPiaOpcaoService } from './services/update-relatorio-pia-opcao.service';
import { PrismaRelatorioPiaRespostaRepository } from '../relatorio-pia-resposta/repositories/prisma/prisma-relatorio-pia-resposta.repository';

@Module({
	providers: [
		CreateRelatorioPiaOpcaoService,
		FindAllRelatorioPiaOpcaoService,
		FindUidRelatorioPiaOpcaoService,
		UpdateRelatorioPiaOpcaoService,
		DeleteRelatorioPiaOpcaoService,
		PrismaRelatorioPiaOpcaoRepository,
		PrismaRelatorioPiaRespostaRepository,
	],
	controllers: [
		CreateRelatorioPiaOpcaoController,
		FindAllRelatorioPiaOpcaoController,
		FindUidRelatorioPiaOpcaoController,
		UpdateRelatorioPiaOpcaoController,
		DeleteRelatorioPiaOpcaoController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class RelatorioPiaOpcaoModule {}
