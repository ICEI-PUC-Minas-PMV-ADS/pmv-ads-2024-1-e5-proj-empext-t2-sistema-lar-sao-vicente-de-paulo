import { InMemoryIdosoRepository } from "@/repositories/in-memory/in-memory-idoso-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { IdosoGenero } from "../../dtos/create-idoso.dto";
import { AppError } from "@utils/app-error";
import { FindUidIdosoService } from "../find-uid-idoso.service";

let idosoRepository: InMemoryIdosoRepository
let sut: FindUidIdosoService
let existingIdoso

describe("Buscar UID Idoso Caso de Uso", async () => {
    beforeEach(async () => {
        idosoRepository = new InMemoryIdosoRepository()
        sut = new FindUidIdosoService(idosoRepository)

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

    it("deve encontrar um idoso pelo UID.", async () => {
        const foundIdoso = await sut.execute(existingIdoso.uid)

        expect(foundIdoso.uid).toEqual(existingIdoso.uid)

    })

    it("deve retornar nulo ao tentar encontrar um idoso pelo UID que não existe", async () => {
        const nonExistingIdosoUid = "non-existing-uid"

        await expect(sut.execute(nonExistingIdosoUid)
        ).rejects.toThrow(AppError);

    })

})