import { Module } from '@nestjs/common';
import { FindUidGrupoPermissaoService } from './services/find-uid-grupo-permissao.service';
import { FindUidGrupoPermissaoController } from './controllers/find-uid-grupo-permissao.controller';
import { FindAllGrupoPermissaoService } from './services/find-all-grupo-permissao.service';
import { FindAllGrupoPermissaoController } from './controllers/find-all-grupo-permissao.controller';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { PrismaGrupoPermissaoRepository } from './repositories/prisma/prisma-grupo-permissao-repository';

@Module({
	providers: [
		FindAllGrupoPermissaoService,
		FindUidGrupoPermissaoService,
		PrismaGrupoPermissaoRepository],
	controllers: [
		FindAllGrupoPermissaoController,
		FindUidGrupoPermissaoController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class GrupoPermissaoModule {}
