import { NecessidadeNutricional } from '@prisma/client';
import { CreateNecessidadeNutricionalDto } from '../dtos/create-necessidade-nutricional.dto';
import { UpdateNecessidadeNutricionalDto } from '../dtos/update-necessidade-nutricional.dto';

export interface necessidadeNutricionalRepository {
	create(
		data: CreateNecessidadeNutricionalDto,
	): Promise<NecessidadeNutricional>;
	findById(id: bigint): Promise<NecessidadeNutricional | null>;
	findByUid(uid: string): Promise<NecessidadeNutricional | null>;
	update(
		data: UpdateNecessidadeNutricionalDto,
		from: NecessidadeNutricional,
	): Promise<NecessidadeNutricional>;
	delete(uid: string): Promise<void>;
}
