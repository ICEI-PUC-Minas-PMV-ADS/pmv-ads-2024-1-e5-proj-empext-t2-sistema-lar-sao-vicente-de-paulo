import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/core/providers/database/database.module";
import { QueryBuilderModule } from "@/core/providers/query-builder/query-builder.module";
import { CreateModeloRelatorioPiaPerguntaService } from "./services/create-modelo-relatorio-pia-pergunta.service";
import { CreateModeloRelatorioPiaPerguntaController } from "./controllers/create-modelo-relatorio-pia-pergunta.controller";
import { PrismaModeloRelatorioPiaPerguntaRepository } from "./repositories/prisma/prisma-modelo-relatorio-pia-pergunta.repository";
import { DeleteModeloRelatorioPiaPerguntaService } from "./services/delete-modelo-relatorio-pia-pergunta.service";
import { FindUidModeloRelatorioPiaPerguntaService } from "./services/find-uid-modelo-relatorio-pia-pergunta.service";
import { UpdateModeloRelatorioPiaPerguntaService } from "./services/update-modelo-relatorio-pia-pergunta.service";
import { UpdateModeloRelatorioPiaPerguntaController } from "./controllers/update-modelo-relatorio-pia-pergunta.controller";
import { FindUidModeloRelatorioPiaPerguntaController } from "./controllers/find-uid-modelo-relatorio-pia-pergunta.controller";
import { DeleteModeloRelatorioPiaPerguntaController } from "./controllers/delete-modelo-relatorio-pia-pergunta.controller";
import { FindAllModeloRelatorioPiaPerguntaController } from "./controllers/find-all-modelo-relatorio-pia-pergunta.controller";
import { FindAllModeloRelatorioPiaPerguntaService } from "./services/find-all-modelo-relatorio-pia-pergunta.service";

@Module({
    providers: [
        CreateModeloRelatorioPiaPerguntaService,
        DeleteModeloRelatorioPiaPerguntaService,
        FindUidModeloRelatorioPiaPerguntaService,
        FindAllModeloRelatorioPiaPerguntaService,
        UpdateModeloRelatorioPiaPerguntaService,
        PrismaModeloRelatorioPiaPerguntaRepository,
    ],
    controllers: [
        CreateModeloRelatorioPiaPerguntaController,
        FindUidModeloRelatorioPiaPerguntaController,
        FindAllModeloRelatorioPiaPerguntaController,
        UpdateModeloRelatorioPiaPerguntaController,
        DeleteModeloRelatorioPiaPerguntaController,
    ],
    imports: [DatabaseModule, QueryBuilderModule]
})

export class ModeloRelatorioPiaPerguntaModule {}