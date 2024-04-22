import { Cargo } from "@prisma/client";
import { UpdateCargoDto } from "../dtos/update-cargo-dto";
import { CreateCargoDto } from "../dtos/create-cargo-dto";

export interface cargoRepository {
    findByUid(uid: string): Promise<Cargo | null>;
    delete(uid: string): Promise<void>;
    update(uid: string, data: UpdateCargoDto): Promise<void>;
    create(data: CreateCargoDto): Promise<Cargo | null>;
}