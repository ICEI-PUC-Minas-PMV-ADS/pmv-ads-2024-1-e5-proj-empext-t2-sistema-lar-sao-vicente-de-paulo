import { Module } from '@nestjs/common';
import { FindUidUsuarioService } from './services/find-uid-usuario.service';
import { FindUidUsuarioController } from './controllers/find-uid-usuario.controller';
import { FindAllUsuarioService } from './services/find-all-usuario.service';
import { FindAllUsuarioController } from './controllers/find-all-usuario.controller';
import { CreateUsuarioService } from './services/create-usuario.service';
import { CreateUsuarioController } from './controllers/create-usuario.controller';
import { UpdateUsuarioService } from './services/update-usuario.service';
import { UpdateUsuarioController } from './controllers/update-usuario.controller';
import { DeleteUsuarioService } from './services/delete-usuario.service';
import { DeleteUsuarioController } from './controllers/delete-usuario.controller';
import { PrismaService } from '@/database/prisma.service';
import { QueryBuilderService } from '@utils/query-builder/query-builder.service';

@Module({
    providers: [
        CreateUsuarioService,
        FindAllUsuarioService,
        FindUidUsuarioService,
        UpdateUsuarioService,
        DeleteUsuarioService,
        PrismaService,
        QueryBuilderService,
    ],
    controllers: [
        CreateUsuarioController,
        FindAllUsuarioController,
        FindUidUsuarioController,
        UpdateUsuarioController,
        DeleteUsuarioController,
    ],
})
export class UsuarioModule {}
