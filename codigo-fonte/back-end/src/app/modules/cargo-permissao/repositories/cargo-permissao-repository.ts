import { CargoPermissao, Permissao, Prisma } from "@prisma/client";
import { UpdateCargoPermissaoDto } from "../dtos/update-cargo-permissao-dto";
import { CreateCargoPermissaoDto } from "../dtos/create-cargo-permissao-dto";


export interface cargoPermissaoRepository {
    findByUid(uid: string): Promise<CargoPermissao | null>;
    delete(uid: string): Promise<void>;
    update(uid: string, data: UpdateCargoPermissaoDto): Promise<void>;
    create(data: CreateCargoPermissaoDto): Promise<void>;
    createMany(permissoes: Array<Prisma.CargoPermissaoCreateManyInput>): Promise<void>;
}