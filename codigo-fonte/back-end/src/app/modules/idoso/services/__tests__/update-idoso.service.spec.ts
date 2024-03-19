import { InMemoryIdosoRepository } from "@/repositories/in-memory/in-memory-idoso-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { IdosoGenero } from "../../dtos/create-idoso.dto";
import { AppError } from "@utils/app-error";
import { UpdateIdosoService } from "../update-idoso.service";
import { UpdateIdosoDto } from "../../dtos/update-idoso.dto";

let idosoRepository: InMemoryIdosoRepository
let sut: UpdateIdosoService
let existingIdoso

describe("Atualizar Idoso Caso de Uso", async () => {
    beforeEach(async () => {
        idosoRepository = new InMemoryIdosoRepository()
        sut = new UpdateIdosoService(idosoRepository)

        existingIdoso = await idosoRepository.create({
            id: 1,
            usuario_id: 1,
            nome: "Idoso John Doe",
            cpf_cnh: "12345678910",
            data_nascimento: new Date(),
            data_admissao: new Date(),
            genero: IdosoGenero.MASCULINO

        })
    })

    it("deve atualizar os dados do idoso com sucesso.", async () => {
        const newIdosoData: UpdateIdosoDto = {
            nome: "Nome novo",
            genero: IdosoGenero.FEMININO,
            cpf_cnh: "12345678910",
            data_nascimento: new Date(),
            data_admissao: new Date(),
        }

        await sut.execute(newIdosoData, existingIdoso.uid)

        const updatedIdoso = await idosoRepository.findByUid(existingIdoso.uid)

        expect(updatedIdoso).toMatchObject(newIdosoData)
    })

    it("deve lançar um erro ao tentar atualizar um idoso que não existe.", async () => {
        const nonExistingIdosoUid = "non-existing-uid"

        const newIdosoData: UpdateIdosoDto = {
            nome: "Nome novo",
            genero: IdosoGenero.FEMININO,
            cpf_cnh: "12345678910",
            data_nascimento: new Date(),
            data_admissao: new Date(),
        }

        await expect(sut.execute(newIdosoData, nonExistingIdosoUid)
        ).rejects.toThrow(AppError);
    })
})