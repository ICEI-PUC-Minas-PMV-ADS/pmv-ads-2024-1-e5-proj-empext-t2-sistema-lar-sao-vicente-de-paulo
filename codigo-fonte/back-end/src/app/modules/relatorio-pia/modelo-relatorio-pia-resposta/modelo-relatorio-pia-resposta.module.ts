import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/core/providers/database/database.module";
import { QueryBuilderModule } from "@/core/providers/query-builder/query-builder.module";
import { CreateModeloRelatorioPiaRespostaController } from "./controllers/create-modelo-relatorio-pia-resposta.controller";
import { DeleteModeloRelatorioPiaRespostaController } from "./controllers/delete-modelo-relatorio-pia-resposta.controller";
import { FindUidModeloRelatorioPiaRespostaController } from "./controllers/find-uid-modelo-relatorio-pia-resposta.controller";
import { UpdateModeloRelatorioPiaRespostaController } from "./controllers/update-modelo-relatorio-pia-resposta.controller";
import { PrismaModeloRelatorioPiaRespostaRepository } from "./repositories/prisma/prisma-modelo-relatorio-pia-resposta.repository";
import { CreateModeloRelatorioPiaRespostaService } from "./services/create-modelo-relatorio-pia-resposta.service";
import { DeleteModeloRelatorioPiaRespostaService } from "./services/delete-modelo-relatorio-pia-resposta.service";
import { FindUidModeloRelatorioPiaRespostaService } from "./services/find-uid-modelo-relatorio-pia-resposta.service";
import { UpdateModeloRelatorioPiaRespostaService } from "./services/update-modelo-relatorio-pia-resposta.service";

@Module({
    providers: [
        CreateModeloRelatorioPiaRespostaService,
        DeleteModeloRelatorioPiaRespostaService,
        FindUidModeloRelatorioPiaRespostaService,
        UpdateModeloRelatorioPiaRespostaService,
        PrismaModeloRelatorioPiaRespostaRepository,
    ],
    controllers: [
        CreateModeloRelatorioPiaRespostaController,
        FindUidModeloRelatorioPiaRespostaController,
        UpdateModeloRelatorioPiaRespostaController,
        DeleteModeloRelatorioPiaRespostaController,
    ],
    imports: [DatabaseModule, QueryBuilderModule]
})

export class ModeloRelatorioPiaRespostaModule {}