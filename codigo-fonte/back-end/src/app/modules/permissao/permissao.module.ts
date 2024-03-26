import { Module } from '@nestjs/common';
import { FindUidPermissaoService } from './services/find-uid-permissao.service';
import { FindUidPermissaoController } from './controllers/find-uid-permissao.controller';
import { FindAllPermissaoService } from './services/find-all-permissao.service';
import { FindAllPermissaoController } from './controllers/find-all-permissao.controller';
import { DatabaseModule } from '@/core/providers/database/database.module';
import { QueryBuilderModule } from '@/core/providers/query-builder/query-builder.module';

@Module({
	providers: [FindAllPermissaoService, FindUidPermissaoService],
	controllers: [FindAllPermissaoController, FindUidPermissaoController],
	imports: [DatabaseModule, QueryBuilderModule],
})
export class PermissaoModule {}
