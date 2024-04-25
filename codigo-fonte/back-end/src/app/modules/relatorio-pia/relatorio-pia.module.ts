import { Delete, Module } from "@nestjs/common";
import { CreateModeloRelatorioPiaService } from "./modelo-relatorio-pia/services/create-modelo-relatorio-pia.service";
import { CreateModeloRelatorioPiaController } from "./modelo-relatorio-pia/controllers/create-modelo-relatorio-pia.controller";
import { DatabaseModule } from "@/core/providers/database/database.module";
import { PrismaModeloRelatorioPiaRepository } from "./modelo-relatorio-pia/repositories/prisma/prisma-modelo-relatorio-pia.repository";
import { DeleteModeloRelatorioPiaService } from "./modelo-relatorio-pia/services/delete-modelo-relatorio-pia.service";
import { DeleteModeloRelatorioPiaController } from "./modelo-relatorio-pia/controllers/delete-modelo-relatorio-pia.controller";
import { UpdateModeloRelatorioPiaService } from "./modelo-relatorio-pia/services/update-modelo-relatorio-pia.service";
import { UpdateModeloRelatorioPiaController } from "./modelo-relatorio-pia/controllers/update-modelo-relatorio-pia.controller";
import { FindUidModeloRelatorioPiaService } from "./modelo-relatorio-pia/services/find-uid-modelo-relatorio-pia.service";
import { FindUidModeloRelatorioPiaController } from "./modelo-relatorio-pia/controllers/find-uid-modelo-relatorio-pia.controller";
import { FindAllModeloRelatorioPiaService } from "./modelo-relatorio-pia/services/find-all-modelo-relatorio-pia.service";
import { FindAllModeloRelatorioPiaController } from "./modelo-relatorio-pia/controllers/find-all-modelo-relatorio-pia.controller";
import { QueryBuilderModule } from "@/core/providers/query-builder/query-builder.module";

@Module({
    providers: [
        CreateModeloRelatorioPiaService,
        DeleteModeloRelatorioPiaService,
        UpdateModeloRelatorioPiaService,
        FindUidModeloRelatorioPiaService,
        FindAllModeloRelatorioPiaService,
        PrismaModeloRelatorioPiaRepository,
    ],
    controllers: [
        CreateModeloRelatorioPiaController,
        FindUidModeloRelatorioPiaController,
        FindAllModeloRelatorioPiaController,
        UpdateModeloRelatorioPiaController,
        DeleteModeloRelatorioPiaController,
    ],
    imports: [DatabaseModule, QueryBuilderModule]
})

export class RelatorioPiaModule {}