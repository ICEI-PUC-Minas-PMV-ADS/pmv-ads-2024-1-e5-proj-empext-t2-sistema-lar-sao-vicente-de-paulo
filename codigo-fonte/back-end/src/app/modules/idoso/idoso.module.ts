import { Module } from "@nestjs/common";
import { CreateIdosoService } from "./services/create-idoso.service";
import { CreateIdosoController } from "./controllers/create-idoso.controller";
import { PrismaUsuarioRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { PrismaIdosoRepository } from "@/repositories/prisma/prisma-idoso-repository";
import { FindAllIdososService } from "./services/find-all-idoso.service";
import { FindAllIdosoController } from "./controllers/find-all-idoso.controller";
import { PrismaService } from "@/database/prisma.service";
import { QueryBuilderService } from "@utils/query-builder/query-builder.service";

@Module({
    providers: [
        CreateIdosoService,
        FindAllIdososService,
        PrismaIdosoRepository,
        PrismaUsuarioRepository,
        PrismaService,
        QueryBuilderService,
    ],
    controllers: [
        CreateIdosoController,
        FindAllIdosoController,
    ]
})
export class IdosoModule { }