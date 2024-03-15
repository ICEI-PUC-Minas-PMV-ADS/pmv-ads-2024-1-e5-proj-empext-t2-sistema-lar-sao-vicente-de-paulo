import { InMemoryUsuarioRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { AppError } from "@utils/app-error";
import { FindUidUsuarioService } from "../find-uid-usuario.service";

let usuarioRepository: InMemoryUsuarioRepository
let sut: FindUidUsuarioService

describe("Buscar Usuário UID Caso de Uso", () => {
    beforeEach(async () => {
        usuarioRepository = new InMemoryUsuarioRepository();
        sut = new FindUidUsuarioService(usuarioRepository)
    })

    it("deve ser possível encontrar o usuário pelo uid.", async () => {

        const existsUsuario = await usuarioRepository.create({
            nome: "John Doe",
            cpf_cnh: "11111111111",
            email: "johndoe@example.com",
            senha: "123456",
        })

        const usuario = await sut.execute(existsUsuario.uid)

        expect(usuario.uid).toEqual(existsUsuario.uid);
    })

    it("deve lançar um erro se nenhum usuário for encontrado.", async () => {
        await expect(() =>
            sut.execute('inexistent-usuario-uid')
        ).rejects.toThrow(AppError);
    })
})
