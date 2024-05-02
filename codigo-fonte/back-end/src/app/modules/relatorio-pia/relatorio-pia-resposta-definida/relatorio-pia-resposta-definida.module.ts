import { DatabaseModule } from '@/core/providers/database/database.module';
import { Module } from '@nestjs/common';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { CreateRelatorioPiaRespostaDefinidaController } from './controllers/create-relatorio-pia-resposta-definida.controller';
import { DeleteRelatorioPiaRespostaDefinidaController } from './controllers/delete-relatorio-pia-resposta-definida.controller';
import { FindAllRelatorioPiaRespostaDefinidaController } from './controllers/find-all-relatorio-pia-resposta-definida.controller';
import { FindUidRelatorioPiaRespostaDefinidaController } from './controllers/find-uid-relatorio-pia-resposta-definida.controller';
import { UpdateRelatorioPiaRespostaDefinidaController } from './controllers/update-relatorio-pia-resposta-definida.controller';
import { PrismaRelatorioPiaRespostaDefinidaRepository } from './repositories/prisma/prisma-relatorio-pia-resposta-definida.repository';
import { CreateRelatorioPiaRespostaDefinidaService } from './services/create-relatorio-pia-resposta-definida.service';
import { DeleteRelatorioPiaRespostaDefinidaService } from './services/delete-relatorio-pia-resposta-definida.service';
import { FindAllRelatorioPiaRespostaDefinidaService } from './services/find-all-relatorio-pia-resposta-definida.service';
import { FindUidRelatorioPiaRespostaDefinidaService } from './services/find-uid-relatorio-pia-resposta-definida.service';
import { UpdateRelatorioPiaRespostaDefinidaService } from './services/update-relatorio-pia-resposta-definida.service';

@Module({
	providers: [
		CreateRelatorioPiaRespostaDefinidaService,
		FindAllRelatorioPiaRespostaDefinidaService,
		FindUidRelatorioPiaRespostaDefinidaService,
		UpdateRelatorioPiaRespostaDefinidaService,
		DeleteRelatorioPiaRespostaDefinidaService,
		PrismaRelatorioPiaRespostaDefinidaRepository,
	],
	controllers: [
		CreateRelatorioPiaRespostaDefinidaController,
		FindAllRelatorioPiaRespostaDefinidaController,
		FindUidRelatorioPiaRespostaDefinidaController,
		UpdateRelatorioPiaRespostaDefinidaController,
		DeleteRelatorioPiaRespostaDefinidaController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class RelatorioPiaRespostaDefinidaModule {}
