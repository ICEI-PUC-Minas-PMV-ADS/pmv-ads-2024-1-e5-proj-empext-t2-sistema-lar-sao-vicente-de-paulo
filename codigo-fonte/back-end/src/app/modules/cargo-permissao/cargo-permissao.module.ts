import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { CreateCargoPermissaoController } from './controllers/create-cargo-permissao.controller';
import { DeleteCargoPermissaoController } from './controllers/delete-cargo-permissao.controller';
import { FindAllCargoPermissaoController } from './controllers/find-all-cargo-permissao.controller';
import { FindUidCargoPermissaoController } from './controllers/find-uid-cargo-permissao.controller';
import { UpdateCargoPermissaoController } from './controllers/update-cargo-permissao.controller';
import { CreateCargoPermissaoService } from './services/create-cargo-permissao.service';
import { DeleteCargoPermissaoService } from './services/delete-cargo-permissao.service';
import { FindAllCargoPermissaoService } from './services/find-all-cargo-permissao.service';
import { FindUidCargoPermissaoService } from './services/find-uid-cargo-permissao.service';
import { UpdateCargoPermissaoService } from './services/update-cargo-permissao.service';
import { PrismaCargoPermissaoRepository } from './repositories/prisma/prisma-cargo-permissao-repository';

@Module({
	providers: [
		CreateCargoPermissaoService,
		UpdateCargoPermissaoService,
		FindAllCargoPermissaoService,
		FindUidCargoPermissaoService,
		DeleteCargoPermissaoService,
		PrismaCargoPermissaoRepository
	],
	controllers: [
		CreateCargoPermissaoController,
		UpdateCargoPermissaoController,
		FindAllCargoPermissaoController,
		FindUidCargoPermissaoController,
		DeleteCargoPermissaoController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class CargoPermissaoModule {}
