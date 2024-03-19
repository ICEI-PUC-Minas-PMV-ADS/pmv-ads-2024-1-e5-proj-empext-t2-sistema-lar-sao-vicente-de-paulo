import { InMemoryIdosoRepository } from "@/repositories/in-memory/in-memory-idoso-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsuarioRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { IdosoGenero } from "../../dtos/create-idoso.dto";
import { DeleteIdosoService } from "../delete-idoso.service";
import { DeleteIdosoDto } from "../../dtos/delete-idoso.dto";
import { AppError } from "@utils/app-error";

let idosoRepository: InMemoryIdosoRepository
let usuarioRepository: InMemoryUsuarioRepository
let sut: DeleteIdosoService

describe("Criação Idoso Caso de Uso", async () => {
    beforeEach(async () => {
        idosoRepository = new InMemoryIdosoRepository()
        usuarioRepository = new InMemoryUsuarioRepository()
        sut = new DeleteIdosoService(idosoRepository)
    })

    it("deve excluir o idoso com sucesso.", async () => {

        const usuario = await usuarioRepository.create({
            id: 1,
            nome: "John Doe",
            email: "johndoe@example.com",
            cpf_cnh: "12345678910",
            senha: "123456",
        });

        const idoso = await idosoRepository.create({
            id: 1,
            usuario_id: usuario.id,
            nome: "Idoso John Doe",
            cpf_cnh: "12345678910",
            data_nascimento: new Date(),
            data_admissao: new Date(),
            genero: IdosoGenero.MASCULINO,
            situacao: "ATIVO"
        })

        const data: DeleteIdosoDto = {
            situacao: "INATIVO",
            motivo_inativacao: "TRANSFERIDO",
        };

        const deletedIdoso = await sut.execute(data, idoso.uid)

        expect(deletedIdoso.situacao).toBe("INATIVO")
    })

    it("deve lançar um erro ao tentar excluir um idoso que não existe.", async () => {
        const nonExistingIdosoUid = "non-existing-uid";

        const data: DeleteIdosoDto = {
            situacao: "INATIVO",
            motivo_inativacao: "TRANSFERIDO",
        };

        await expect(sut.execute(data, nonExistingIdosoUid)
        ).rejects.toThrow(AppError);
    })
})

