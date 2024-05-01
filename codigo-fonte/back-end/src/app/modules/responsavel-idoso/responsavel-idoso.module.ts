import { Module } from '@nestjs/common';
import { FindUidResponsavelIdosoService } from './services/find-uid-responsavel-idoso.service';
import { FindUidResponsavelIdosoController } from './controllers/find-uid-responsavel-idoso.controller';
import { FindAllResponsavelIdosoService } from './services/find-all-responsavel-idoso.service';
import { FindAllResponsavelIdosoController } from './controllers/find-all-responsavel-idoso.controller';
import { CreateResponsavelIdosoService } from './services/create-responsavel-idoso.service';
import { CreateResponsavelIdosoController } from './controllers/create-responsavel-idoso.controller';
import { UpdateResponsavelIdosoService } from './services/update-responsavel-idoso.service';
import { UpdateResponsavelIdosoController } from './controllers/update-responsavel-idoso.controller';
import { DeleteResponsavelIdosoService } from './services/delete-responsavel-idoso.service';
import { DeleteResponsavelIdosoController } from './controllers/delete-responsavel-idoso.controller';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';

@Module({
	providers: [
		FindUidResponsavelIdosoService,
		FindAllResponsavelIdosoService,
		CreateResponsavelIdosoService,
		UpdateResponsavelIdosoService,
		DeleteResponsavelIdosoService,
	],
	controllers: [
		FindUidResponsavelIdosoController,
		FindAllResponsavelIdosoController,
		CreateResponsavelIdosoController,
		UpdateResponsavelIdosoController,
		DeleteResponsavelIdosoController,
	],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class ResponsavelIdosoModule {}
