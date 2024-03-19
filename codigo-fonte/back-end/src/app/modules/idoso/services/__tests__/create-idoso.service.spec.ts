import { InMemoryIdosoRepository } from "@/repositories/in-memory/in-memory-idoso-repository";
import { CreateIdosoService } from "../create-idoso.service";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsuarioRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { IdosoGenero } from "../../dtos/create-idoso.dto";
import { AppError } from "@utils/app-error";

let idosoRepository: InMemoryIdosoRepository
let usuarioRepository: InMemoryUsuarioRepository
let sut: CreateIdosoService

describe("Criação Idoso Caso de Uso", async () => {
    beforeEach(async () => {
        idosoRepository = new InMemoryIdosoRepository()
        usuarioRepository = new InMemoryUsuarioRepository()
        sut = new CreateIdosoService(idosoRepository, usuarioRepository)
    })

    it("deve criar um novo idoso.", async () => {

        const usuario = await usuarioRepository.create({
            nome: "John Doe",
            email: "johndoe@example.com",
            cpf_cnh: "12345678910",
            senha: "123456",
        });

        const idoso = await sut.execute({
            usuario_id: usuario.uid,
            nome: "Idoso John Doe",
            cpf_cnh: "12345678910",
            data_nascimento: new Date(),
            data_admissao: new Date(),
            genero: IdosoGenero.MASCULINO

        })
        expect(idoso.uid).toEqual(expect.any(String));

    })

    it("deve lançar um erro ao tentar criar um idoso com CPF existente.", async () => {
        const cpf = "12345678901"

        const usuario = await usuarioRepository.create({
            nome: "John Doe",
            email: "johndoe@example.com",
            cpf_cnh: "12345678910",
            senha: "123456",
        });

        await sut.execute({
            usuario_id: usuario.uid,
            nome: "Idoso John Doe",
            cpf_cnh: cpf,
            data_nascimento: new Date(),
            data_admissao: new Date(),
            genero: IdosoGenero.MASCULINO

        })

        await expect(() =>
            sut.execute({
                usuario_id: usuario.uid,
                nome: "Idoso John Doe 2",
                cpf_cnh: cpf,
                data_nascimento: new Date(),
                data_admissao: new Date(),
                genero: IdosoGenero.FEMININO
            })
        ).rejects.toThrow(AppError)
    })
})

