import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/core/providers/database/database.module";
import { QueryBuilderModule } from "@/core/providers/query-builder/query-builder.module";
import { CreateModeloRelatorioPiaOpcaoController } from "./controllers/create-modelo-relatorio-pia-opcao.controller";
import { FindUidModeloRelatorioPiaOpcaoController } from "./controllers/find-uid-modelo-relatorio-pia-opcao.controller";
import { UpdateModeloRelatorioPiaOpcaoController } from "./controllers/update-modelo-relatorio-pia-opcao.controller";
import { PrismaModeloRelatorioPiaOpcaoRepository } from "./repositories/prisma/prisma-modelo-relatorio-pia-opcao.repository";
import { CreateModeloRelatorioPiaOpcaoService } from "./services/create-modelo-relatorio-pia-opcao.service";
import { DeleteModeloRelatorioPiaOpcaoService } from "./services/delete-modelo-relatorio-pia-opcao.service";
import { FindUidModeloRelatorioPiaOpcaoService } from "./services/find-uid-modelo-relatorio-pia-opcao.service";
import { UpdateModeloRelatorioPiaOpcaoService } from "./services/update-modelo-relatorio-pia-opcao.service";
import { DeleteModeloRelatorioPiaOpcaoController } from "./controllers/delete-modelo-relatorio-pia-opcao.controller";
import { FindAllModeloRelatorioPiaOpcaoService } from "./services/find-all-modelo-relatorio-pia-opcao.service";
import { FindAllModeloRelatorioPiaOpcaoController } from "./controllers/find-all-modelo-relatorio-pia-opcao.controller";

@Module({
    providers: [
        CreateModeloRelatorioPiaOpcaoService,
        DeleteModeloRelatorioPiaOpcaoService,
        FindAllModeloRelatorioPiaOpcaoService,
        FindUidModeloRelatorioPiaOpcaoService,
        UpdateModeloRelatorioPiaOpcaoService,
        PrismaModeloRelatorioPiaOpcaoRepository,
    ],
    controllers: [
        CreateModeloRelatorioPiaOpcaoController,
        FindAllModeloRelatorioPiaOpcaoController,
        FindUidModeloRelatorioPiaOpcaoController,
        UpdateModeloRelatorioPiaOpcaoController,
        DeleteModeloRelatorioPiaOpcaoController,
    ],
    imports: [DatabaseModule, QueryBuilderModule]
})

export class ModeloRelatorioPiaRespostaOpcaoModule {}