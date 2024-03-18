import { Module } from "@nestjs/common";
import { CreateIdosoService } from "./services/create-idoso.service";
import { CreateIdosoController } from "./controllers/create-idoso.controller";
import { PrismaUsuarioRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { PrismaIdosoRepository } from "@/repositories/prisma/prisma-idoso-repository";

@Module({
    providers: [
        CreateIdosoService,
        PrismaIdosoRepository,
        PrismaUsuarioRepository,
    ],
    controllers: [
        CreateIdosoController,
    ]
})
export class IdosoModule { }