import { Injectable } from "@nestjs/common";
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";
import * as bcrypt from "bcrypt";
import { AppError } from "@/common/utils/app-error";
import { PrismaUsuarioRepository } from "@/repositories/prisma/prisma-usuario-repository";

@Injectable()
export class CreateUsuarioService {
    constructor(private usuarioRepository: PrismaUsuarioRepository) { }

    async execute(data: CreateUsuarioDto): Promise<void> {
        const hash = await bcrypt.hash(data.senha, 10);

        const usuarioExist = await this.usuarioRepository.alreadyExists(data.email, data.cpf_cnh);

        if (usuarioExist) throw new AppError("Usuário já cadastrado");

        await this.usuarioRepository.create({
            ...data,
            senha: hash,
        });
        return;
    }
}
