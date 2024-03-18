import { Module } from "@nestjs/common";
import { CreateIdosoService } from "./services/create-idoso.service";
import { CreateIdosoController } from "./controllers/create-idoso.controller";
import { PrismaUsuarioRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { PrismaIdosoRepository } from "@/repositories/prisma/prisma-idoso-repository";
import { FindAllIdososService } from "./services/find-all-idoso.service";
import { FindAllIdosoController } from "./controllers/find-all-idoso.controller";
import { PrismaService } from "@/database/prisma.service";
import { QueryBuilderService } from "@utils/query-builder/query-builder.service";
import { FindUidIdosoController } from "./controllers/find-uid-idoso.controller";
import { FindUidIdosoService } from "./services/find-uid-idoso.service";
import { DeleteIdosoService } from "./services/delete-idoso.service";
import { DeleteIdosoController } from "./controllers/delete-idoso.controller";

@Module({
    providers: [
        CreateIdosoService,
        FindAllIdososService,
        FindUidIdosoService,
        DeleteIdosoService,
        PrismaIdosoRepository,
        PrismaUsuarioRepository,
        PrismaService,
        QueryBuilderService,
    ],
    controllers: [
        CreateIdosoController,
        FindAllIdosoController,
        FindUidIdosoController,
        DeleteIdosoController
    ]
})
export class IdosoModule { }