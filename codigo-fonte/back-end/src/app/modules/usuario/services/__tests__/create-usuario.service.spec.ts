import { InMemoryUsuarioRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { CreateUsuarioService } from "../create-usuario.service";
import { expect, describe, it, beforeEach } from "vitest";
import { compare } from "bcrypt";
import { AppError } from "@/common/utils/app-error";

let usuarioRepository: InMemoryUsuarioRepository
let sut: CreateUsuarioService

describe("Create Usuario Use Case", () => {
    beforeEach(() => {
        usuarioRepository = new InMemoryUsuarioRepository();
        sut = new CreateUsuarioService(usuarioRepository)
    })

    it("should be able to register", async () => {
        const { usuario } = await sut.execute({
            nome: "John Doe",
            cpf_cnh: "11111111111",
            email: "johndoe@example.com",
            senha: "123456",
        });

        expect(usuario.uid).toEqual(expect.any(String));
    })

    it("should hash user password upon registration", async () => {
        const { usuario } = await sut.execute({
            nome: "John Doe",
            cpf_cnh: "11111111111",
            email: "johndoe@example.com",
            senha: "123456",
        });

        const isPasswordCorrectlyHashed = await compare(
            "123456",
            usuario.senha
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it("should not be able to register with same email twice", async () => {
        const email = "johndoe@example.com";

        await sut.execute({
            nome: "John Doe",
            cpf_cnh: "11111111111",
            email,
            senha: "123456",
        });

        await expect(() =>
            sut.execute({
                nome: "John Doe",
                cpf_cnh: "11111111111",
                email,
                senha: "123456",
            })
        ).rejects.toThrow(AppError);
    });

    it("should not be able to register with same cpf_cnh twice", async () => {
        const cpf_cnh = "11111111111";

        await sut.execute({
            nome: "John Doe",
            cpf_cnh,
            email: "johndoe@example.com",
            senha: "123456",
        });

        await expect(() =>
            sut.execute({
                nome: "John Doe",
                cpf_cnh,
                email: "johndoe@example.com",
                senha: "123456",
            })
        ).rejects.toThrow(AppError);
    });
})