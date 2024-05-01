import { CargoPermissao, Permissao, Prisma } from "@prisma/client";
import { cargoPermissaoRepository } from "../cargo-permissao-repository";
import { prisma } from "@/core/providers/database/prisma.service";
import { UpdateCargoPermissaoDto } from "../../dtos/update-cargo-permissao-dto";
import { CreateCargoPermissaoDto } from "../../dtos/create-cargo-permissao-dto";

export class PrismaCargoPermissaoRepository implements cargoPermissaoRepository {

    async findByUid(uid: string): Promise<CargoPermissao | null>{

       const cargoPermissoes = await prisma.cargoPermissao.findFirst({
			where: {
				uid,
			},
		});

        return cargoPermissoes;
    }

    async delete(uid: string): Promise<void> {
        await prisma.cargoPermissao.delete({
			where: {
				uid,
			},
		});

        return;
    }

    async update(uid: string, data: UpdateCargoPermissaoDto): Promise<void> {
        await prisma.cargoPermissao.update({
			where: {
				uid,
			},
			data,
		});

        return;
    }

    async create(data: CreateCargoPermissaoDto): Promise<void> {
        await prisma.cargoPermissao.create({
			data,
		});

        return;

    }

    async createMany(permissoes: Array<Prisma.CargoPermissaoCreateManyInput>): Promise<void> {
		await prisma.cargoPermissao.createMany({
			data: permissoes,
		});
	}
}