import { InMemoryUsuarioRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { AppError } from "@utils/app-error";
import { UpdateUsuarioService } from "../update-usuario.service";

let usuarioRepository: InMemoryUsuarioRepository
let sut: UpdateUsuarioService

describe("Atualizar Usuario Caso de Uso", () => {
    beforeEach(async () => {
        usuarioRepository = new InMemoryUsuarioRepository();
        sut = new UpdateUsuarioService(usuarioRepository)
    })

    it("deve ser possível atualizar usuário.", async () => {
        const existsUsuario = await usuarioRepository.create({
            nome: "John Doe",
            cpf_cnh: "11111111111",
            email: "johndoe@example.com",
            senha: "123456",
        })

        const data = {
            nome: "John Doe 2",
            cpf_cnh: "222222222222",
            email: "johndoe2@example.com",
        }

        const updatedUsuario = await usuarioRepository.update(existsUsuario.uid, data)

        expect(updatedUsuario.nome).toBe(data.nome);
        expect(updatedUsuario.cpf_cnh).toBe(data.cpf_cnh);
        expect(updatedUsuario.email).toBe(data.email);
    })

    it("não deve ser possível atualizar usuário inexistente.", async () => {
        const data = {
            nome: "John Doe 2",
            cpf_cnh: "222222222222",
            email: "johndoe2@example.com",
        }

        await expect(() => sut.execute('inexistent-usuario-uid', data)
        ).rejects.toThrow(AppError);
    })
})
