import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';
import { CreateCargoController } from './controllers/create-cargo.controller';
import { DeleteCargoController } from './controllers/delete-cargo.controller';
import { FindAllCargoController } from './controllers/find-all-cargo.controller';
import { FindUidCargoController } from './controllers/find-uid-cargo.controller';
import { UpdateCargoController } from './controllers/update-cargo.controller';
import { CreateCargoService } from './services/create-cargo.service';
import { DeleteCargoService } from './services/delete-cargo.service';
import { FindAllCargoService } from './services/find-all-cargo.service';
import { FindUidCargoService } from './services/find-uid-cargo.service';
import { UpdateCargoService } from './services/update-cargo.service';
import { PrismaCargoRepository } from './repositories/prisma/prisma-cargo-repository';
import { PrismaCargoPermissaoRepository } from '../cargo-permissao/repositories/prisma/prisma-cargo-permissao-repository';

@Module({
	providers: [
		CreateCargoService,
		UpdateCargoService,
		FindAllCargoService,
		FindUidCargoService,
		DeleteCargoService,
		PrismaCargoRepository,
		PrismaCargoPermissaoRepository
	],
	controllers: [
		CreateCargoController,
		UpdateCargoController,
		FindAllCargoController,
		FindUidCargoController,
		DeleteCargoController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class CargoModule {}
